import { Status } from "tweeter-shared";
import { View } from "./View";

export interface StatusItemView extends View {
  addItems(newItems: Status[]): void;
}
