import { PAGE_SIZE, UserItemPresenter } from "./UserItemPresenter";
import { AuthToken, User } from "tweeter-shared";

export class FollowerPresenter extends UserItemPresenter {
  protected getItemDescription(): string {
    return "load followers";
  }

  protected getMoreItems(
    authToken: AuthToken,
    userAlias: string,
  ): Promise<[User[], boolean]> {
    return this.service.loadMoreFollowers(
      authToken,
      userAlias,
      PAGE_SIZE,
      this.lastItem,
    );
  }
}
