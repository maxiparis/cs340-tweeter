import { AddItemsView } from "../../listeners/super/AddItemsView";
import { PageItemPresenter } from "../../presenters/super/PageItemPresenter";
import useToastListener from "../toaster/ToastListenerHook";
import React, { startTransition, useEffect, useState } from "react";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";
import InfiniteScroll from "react-infinite-scroll-component";

interface Props<ItemType, ServiceType> {
  presenterGenerator: (
    view: AddItemsView<ItemType>,
  ) => PageItemPresenter<ItemType, ServiceType>;
  itemComponentGenerator: (item: ItemType) => JSX.Element;
}

function ItemScroller<ItemType, ServiceType>({
  presenterGenerator,
  itemComponentGenerator,
}: Props<ItemType, ServiceType>) {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<ItemType[]>([]);
  const [newItems, setNewItems] = useState<ItemType[]>([]);

  const listener: AddItemsView<ItemType> = {
    addItems: (newItems: ItemType[]) => setNewItems(newItems),
    displayErrorMessage: displayErrorMessage,
  };
  const [presenter] = useState(presenterGenerator(listener));

  const { displayedUser, authToken } = useUserInfoListener();

  useEffect(() => {
    // Reset state and load new items whenever `displayedUser` changes
    reset();

    // Ensure loading is scheduled in a non-blocking way
    startTransition(() => {
      loadMoreItems();
    });
  }, [displayedUser]);

  useEffect(() => {
    if (newItems.length > 0) {
      // Use functional update to batch new items
      setItems((prevItems) => [...prevItems, ...newItems]);
      setNewItems([]); // Clear `newItems` after merging
    }
  }, [newItems]);

  const reset = () => {
    setItems([]);
    setNewItems([]);
    presenter.reset();
    // setChangedDisplayedUser(true);
  };

  const loadMoreItems = async () => {
    presenter.loadMoreItems(authToken!, displayedUser!.alias);
    // setChangedDisplayedUser(false);
  };

  return (
    <div className="ItemsScroller container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map(
          (item, index) => itemComponentGenerator(item),
          // <StatusItem item={item} index={index} />
        )}
      </InfiniteScroll>
    </div>
  );
}

export default ItemScroller;
