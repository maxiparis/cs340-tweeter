import { StatusItemPresenter } from "./StatusItemPresenter";
import { AuthToken, Status } from "tweeter-shared";
import { PAGE_SIZE } from "../super/PageItemPresenter";

export default class StoryPresenter extends StatusItemPresenter {
  protected getItemDescription(): string {
    return "load story items";
  }

  protected getMoreItems(
    authToken: AuthToken,
    userAlias: string,
  ): Promise<[Status[], boolean]> {
    return this.service.loadMoreStoryItems(
      authToken!,
      userAlias,
      PAGE_SIZE,
      this.lastItem,
    );
  }
}
