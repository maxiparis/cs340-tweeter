import { StatusItemPresenter } from "./StatusItemPresenter";
import { AuthToken, Status } from "tweeter-shared";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export const PAGE_SIZE = 10;

export default class FeedPresenter extends StatusItemPresenter {
  constructor(view: AddItemsView<Status>) {
    super(view);
  }

  async loadMoreItems(authToken: AuthToken, userAlias: string) {
    await this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.statusService.loadMoreFeedItems(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem,
      );

      this._hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, "load feed items");
  }
}
