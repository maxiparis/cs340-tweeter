import { AuthToken, User } from "tweeter-shared";
import { UserItemView } from "../../listeners/UserItemView";
import { FollowService } from "../../model/service/FollowService";

export abstract class UserItemPresenter {
  /// Properties
  private readonly _view: UserItemView;
  private readonly _followService: FollowService;
  private _hasMoreItems = true;
  private _lastItem: User | null = null;

  // Constructor
  protected constructor(view: UserItemView) {
    this._view = view;
    this._followService = new FollowService();
  }

  //Getters/Setters
  protected get view() {
    return this._view;
  }

  protected get followService(): FollowService {
    return this._followService;
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

  //Methods
  public abstract loadMoreItems(authToken: AuthToken, userAlias: string): void;

  reset() {
    this._lastItem = null;
    this._hasMoreItems = true;
  }
}
