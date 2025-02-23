import React, { startTransition } from "react";
import { Status } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";
import { StatusItemPresenter } from "../../presenters/status-item/StatusItemPresenter";
import { AddItemsView } from "../../listeners/super/AddItemsView";

interface Props {
  presenterGenerator: (view: AddItemsView<Status>) => StatusItemPresenter;
}

const StatusItemScroller = ({ presenterGenerator }: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [newItems, setNewItems] = useState<Status[]>([]);

  const listener: AddItemsView<Status> = {
    addItems: (newItems: Status[]) => setNewItems(newItems),
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
    <div className="StatusItemsScroller container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenter.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <StatusItem item={item} index={index} />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default StatusItemScroller;
