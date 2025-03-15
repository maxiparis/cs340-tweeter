import { User } from "tweeter-shared";
import { FollowService } from "../../../../tweeter-server/src/model/service/FollowService";
import { PageItemPresenter } from "../super/PageItemPresenter";
export const PAGE_SIZE = 10;

export abstract class UserItemPresenter extends PageItemPresenter<
  User,
  FollowService
> {
  createService(): FollowService {
    return new FollowService();
  }
}
