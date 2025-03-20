import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> => {
  const followService = new FollowServiceDAO();
  const [items, hasMore] = await followService.fetchMoreFollowers(
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
