import { User } from "tweeter-shared";
import { PageItemPresenter } from "../super/PageItemPresenter";
import { FollowService } from "../../model/service/FollowService";
export const PAGE_SIZE = 10;

export abstract class UserItemPresenter extends PageItemPresenter<
  User,
  FollowService
> {
  createService(): FollowService {
    return new FollowService();
  }
}
