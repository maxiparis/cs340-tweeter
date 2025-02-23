import { User } from "tweeter-shared";
import { View } from "./View";

export interface UserItemView extends View {
  addItems(newItems: User[]): void;
}
