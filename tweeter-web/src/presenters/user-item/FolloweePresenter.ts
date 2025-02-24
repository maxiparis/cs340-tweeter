import { PAGE_SIZE, UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export class FolloweePresenter extends UserItemPresenter {
  public constructor(view: AddItemsView<User>) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    await this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.service.loadMoreFollowees(
        authToken,
        userAlias,
        PAGE_SIZE,
        this.lastItem,
      );

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, "load followees");
  }
}
