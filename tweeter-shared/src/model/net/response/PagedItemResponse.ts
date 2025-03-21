import { TweeterResponse } from "./TweeterResponse";

export interface PagedItemResponse<ItemType> extends TweeterResponse {
  readonly items: ItemType[] | null;
  readonly hasMore: boolean;
}
