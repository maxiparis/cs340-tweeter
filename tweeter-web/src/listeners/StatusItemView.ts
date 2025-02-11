import { Status } from "tweeter-shared";

export interface StatusItemView {
  addItems(newItems: Status[]): void;
  displayErrorMessage: (message: string) => void;
}
