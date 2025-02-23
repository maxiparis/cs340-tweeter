import { FollowService } from "../../model/service/FollowService";
import { UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";
import { UserItemView } from "../../listeners/UserItemView";
export const PAGE_SIZE = 10;

export class FolloweePresenter extends UserItemPresenter {
  public constructor(view: UserItemView) {
    super(view);
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    await this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.followService.loadMoreFollowees(
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
