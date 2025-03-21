import { TweeterRequest } from "./TweeterRequest";

export interface PagedItemRequest<ItemType> extends TweeterRequest {
  readonly pageSize: number;
  readonly lastItem: ItemType | null;
}
