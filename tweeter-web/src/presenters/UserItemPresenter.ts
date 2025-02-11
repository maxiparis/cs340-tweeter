import { AuthToken, User } from "tweeter-shared";

export interface UserItemView {
  addItems(newItems: User[]): void;
  displayErrorMessage: (message: string) => void;
}

export abstract class UserItemPresenter {
  /// Properties
  private readonly _view: UserItemView;
  private _hasMoreItems = true;
  private _lastItem: User | null = null;

  protected constructor(view: UserItemView) {
    this._view = view;
  }

  protected get view() {
    return this._view;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(hasMoreItems: boolean) {
    this._hasMoreItems = hasMoreItems;
  }

  protected get lastItem() {
    return this._lastItem;
  }

  protected set lastItem(newItem: User | null) {
    this._lastItem = newItem;
  }

  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;

  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
}
