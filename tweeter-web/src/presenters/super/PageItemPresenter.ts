import { Presenter } from "./Presenter";
import { AuthToken } from "tweeter-shared";
import { AddItemsView } from "../../listeners/super/AddItemsView";

export const PAGE_SIZE = 10;

export abstract class PageItemPresenter<
  ItemType,
  ServiceType,
> extends Presenter<AddItemsView<ItemType>> {
  private _lastItem: ItemType | null = null;
  private _hasMoreItems = true;
  private _service: ServiceType;

  public constructor(view: AddItemsView<ItemType>) {
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

  public abstract createService(): ServiceType;
  protected abstract getItemDescription(): string;
  protected abstract getMoreItems(
    authToken: AuthToken,
    userAlias: string,
  ): Promise<[ItemType[], boolean]>;

  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }

  public async loadMoreItems(authToken: AuthToken, userAlias: string) {
    await this.doFailureReportingOperation(async () => {
      const [newItems, hasMore] = await this.getMoreItems(authToken, userAlias);

      this.hasMoreItems = hasMore;
      this.lastItem = newItems[newItems.length - 1];
      this.view.addItems(newItems);
    }, this.getItemDescription());
  }
}
