import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowServiceBE } from "../../model/service/FollowServiceBE";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> => {
  const followService = new FollowServiceBE();
  const [items, hasMore] = await followService.fetchMoreFollowees(
    request.token,
    request.userAlias,
    request.pageSize,
    request.lastItem,
  );

  return {
    success: true,
    message: null,
    items: items,
    hasMore: hasMore,
  };
};
