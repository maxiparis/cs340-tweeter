import { UserAliasRequest } from "./TweeterRequest";

/**
 * {
 *   token: authToken.token,
 *   userAlias: userAlias,
 *   pageSize: pageSize,
 *   lastItem: lastItem?.dto ?? null,
 * }
 */

export interface PagedItemRequest<ItemType> extends UserAliasRequest {
  readonly pageSize: number;
  readonly lastItem: ItemType | null;
}
