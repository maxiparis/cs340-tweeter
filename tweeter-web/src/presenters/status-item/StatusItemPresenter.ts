import StatusService from "../../model/service/StatusService";
import { Status } from "tweeter-shared";
import { PageItemPresenter } from "../super/PageItemPresenter";

export abstract class StatusItemPresenter extends PageItemPresenter<
  Status,
  StatusService
> {
  createService(): StatusService {
    return new StatusService();
  }
}
