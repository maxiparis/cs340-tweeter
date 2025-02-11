import { User } from "tweeter-shared";

export interface UserItemView {
  addItems(newItems: User[]): void;
  displayErrorMessage: (message: string) => void;
}
