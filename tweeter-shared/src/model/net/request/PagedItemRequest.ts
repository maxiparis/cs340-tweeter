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
  /** from TweeterRequest:
   - readonly token: string;
   **/

  /** from UserAliasRequest
   -  readonly userAlias: string;
   */

  readonly pageSize: number;
  readonly lastItem: ItemType | null;
}
