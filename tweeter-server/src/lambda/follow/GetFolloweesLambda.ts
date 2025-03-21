import { PagedItemRequest, PagedItemResponse, UserDto } from "tweeter-shared";
import { FollowServiceBE } from "../../model/service/FollowServiceBE";

export const handler = async (
  request: PagedItemRequest<UserDto>,
): Promise<PagedItemResponse<UserDto>> => {
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
