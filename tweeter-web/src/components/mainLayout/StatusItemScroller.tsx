import React from "react";
import { AuthToken, Status } from "tweeter-shared";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import StatusItem from "../statusItem/StatusItem";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";

interface Props {
  loadItems: (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ) => Promise<[Status[], boolean]>;
  itemDescription: string;
}

export const PAGE_SIZE = 10;

const StatusItemScroller = ({ loadItems, itemDescription }: Props) => {
  const { displayErrorMessage } = useToastListener();
  const [items, setItems] = useState<Status[]>([]);
  const [newItems, setNewItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [lastItem, setLastItem] = useState<Status | null>(null);
  const [changedDisplayedUser, setChangedDisplayedUser] = useState(true);

  const addItems = (newItems: Status[]) => setNewItems(newItems);

  const { displayedUser, authToken } = useUserInfoListener();

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
  }, [displayedUser]);

  // Load initial items whenever the displayed user changes. Done in a separate useEffect hook so the changes from reset will be visible.
  useEffect(() => {
    if (changedDisplayedUser) {
      loadMoreItems();
    }
  }, [changedDisplayedUser]);

  // Add new items whenever there are new items to add
  useEffect(() => {
    if (newItems) {
      setItems([...items, ...newItems]);
    }
  }, [newItems]);

  const reset = async () => {
    setItems([]);
    setNewItems([]);
    setLastItem(null);
    setHasMoreItems(true);
    setChangedDisplayedUser(true);
  };

  const loadMoreItems = async () => {
    try {
      const [newItems, hasMore] = await loadItems(
        authToken!,
        displayedUser!.alias,
        PAGE_SIZE,
        lastItem,
      );

      setHasMoreItems(hasMore);
      setLastItem(newItems[newItems.length - 1]);
      addItems(newItems);
      setChangedDisplayedUser(false);
    } catch (error) {
      displayErrorMessage(
        `Failed to load ${itemDescription} items because of exception: ${error}`,
      );
    }
  };

  return (
    <div className="StatusItemsScroller container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={hasMoreItems}
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
