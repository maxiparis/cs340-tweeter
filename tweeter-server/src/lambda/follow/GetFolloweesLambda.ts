import { PagedUserItemRequest, PagedUserItemResponse } from "tweeter-shared";
import { FollowServiceDB } from "../../model/service/FollowServiceDB";

export const handler = async (
  request: PagedUserItemRequest,
): Promise<PagedUserItemResponse> => {
  const followService = new FollowServiceDB();
  const [items, hasMore] = await followService.loadMoreFollowees(
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
