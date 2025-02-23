import { StatusItemPresenter } from "./StatusItemPresenter";
import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE } from "./FeedPresenter";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export default class StoryPresenter extends StatusItemPresenter {
  constructor(view: AddItemsView<Status>) {
    super(view);
  }

  async loadMoreItems(authToken: AuthToken, userAlias: string) {
    await this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
        authToken!,
        userAlias,
        PAGE_SIZE,
        this.lastItem,
      );

      this._hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, "load story items");
  }
}
