import { StatusItemPresenter } from "./StatusItemPresenter";
import { StatusItemView } from "../../listeners/StatusItemView";
import { AuthToken } from "tweeter-shared";
import { PAGE_SIZE } from "./FeedPresenter";

export default class StoryPresenter extends StatusItemPresenter {
  constructor(view: StatusItemView) {
    super(view);
  }

  async loadMoreItems(authToken: AuthToken, userAlias: string) {
    try {
      const [newItems, hasMore] = await this.statusService.loadMoreStoryItems(
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
        `Failed to load story items because of exception: ${error}`,
      );
    }
  }
}
