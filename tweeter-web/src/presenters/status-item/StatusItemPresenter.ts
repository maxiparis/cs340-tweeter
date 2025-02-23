import StatusService from "../../model/service/StatusService";
import { AuthToken, Status } from "tweeter-shared";
import { Presenter } from "../Presenter";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export abstract class StatusItemPresenter extends Presenter<
  AddItemsView<Status>
> {
  private readonly _statusService: StatusService;

  private _lastItem: Status | null = null;
  protected _hasMoreItems = true;

  protected constructor(view: AddItemsView<Status>) {
    super(view);
    this._statusService = new StatusService();
  }

  protected get statusService(): StatusService {
    return this._statusService;
  }

  get lastItem(): Status | null {
    return this._lastItem;
  }

  set lastItem(value: Status | null) {
    this._lastItem = value;
  }

  get hasMoreItems(): boolean {
    return this._hasMoreItems;
  }

  set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;

  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
}
