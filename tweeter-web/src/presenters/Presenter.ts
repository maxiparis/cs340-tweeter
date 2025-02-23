import { View } from "../listeners/View";

export class Presenter<T extends View> {
  protected _view: T;

  protected constructor(view: T) {
    this._view = view;
  }

  protected get view(): T {
    return this._view;
  }

  public async doFailureReportingOperation(
    operation: () => Promise<void>,
    description: string,
    finallyOperation?: () => void,
  ) {
    try {
      await operation();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to ${description} because of exception: ${error}`,
      );
    } finally {
      finallyOperation?.();
    }
  }
}
