import { View } from "../listeners/View";

export class Presenter<T extends View> {
  protected _view: T;

  protected constructor(view: T) {
    this._view = view;
  }

  protected get view(): T {
    return this._view;
  }
}
