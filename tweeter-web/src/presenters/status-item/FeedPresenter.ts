import { StatusItemPresenter } from "./StatusItemPresenter";
import { StatusItemView } from "../../listeners/StatusItemView";
import { AuthToken } from "tweeter-shared";

export const PAGE_SIZE = 10;

export default class FeedPresenter extends StatusItemPresenter {
  constructor(view: StatusItemView) {
    super(view);
  }

  async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.statusService.loadMoreFeedItems(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem,
      );

      this._hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to load feed items because of exception: ${error}`,
      );
    }
  }
}
