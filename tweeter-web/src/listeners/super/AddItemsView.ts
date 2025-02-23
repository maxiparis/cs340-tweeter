import { View } from "./View";

export interface AddItemsView<T> extends View {
  addItems(newItems: T[]): void;
}
