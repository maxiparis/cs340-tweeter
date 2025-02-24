import { Presenter } from "./Presenter";
import { AuthToken } from "tweeter-shared";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export abstract class PageItemPresenter<
  ItemType,
  ServiceType,
> extends Presenter<AddItemsView<ItemType>> {
  private _lastItem: ItemType | null = null;
  private _hasMoreItems = true;
  private _service: ServiceType;

  protected constructor(view: AddItemsView<ItemType>) {
    super(view);
    this._service = this.createService();
  }

  get service(): ServiceType {
    return this._service;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(newItem: ItemType | null) {
    this._lastItem = newItem;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(hasMoreItems: boolean) {
    this._hasMoreItems = hasMoreItems;
  }

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;
  public abstract createService(): ServiceType;

  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
}
