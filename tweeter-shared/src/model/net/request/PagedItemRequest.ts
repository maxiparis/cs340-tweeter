import { TweeterRequest } from "./TweeterRequest";

/**
 * {
 *   token: authToken.token,
 *   userAlias: userAlias,
 *   pageSize: pageSize,
 *   lastItem: lastItem?.dto ?? null,
 * }
 */

export interface PagedItemRequest<ItemType> extends TweeterRequest {
  readonly pageSize: number;
  readonly lastItem: ItemType | null;
}
