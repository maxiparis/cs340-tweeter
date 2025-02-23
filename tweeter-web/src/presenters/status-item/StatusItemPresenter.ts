import { StatusItemView } from "../../listeners/StatusItemView";
import StatusService from "../../model/service/StatusService";
import { AuthToken, Status } from "tweeter-shared";

export abstract class StatusItemPresenter {
  private readonly _view: StatusItemView;
  private readonly _statusService: StatusService;

  private _lastItem: Status | null = null;
  protected _hasMoreItems = true;

  protected constructor(view: StatusItemView) {
    this._view = view;
    this._statusService = new StatusService();
  }

  //Getters/Setters
  protected get view() {
    return this._view;
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
    // setLastItem(null);
    // setHasMoreItems(true);
  }
}
