import { PagedItemRequest, PagedItemResponse, UserDto } from "tweeter-shared";
import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: PagedItemRequest<UserDto>,
): Promise<PagedItemResponse<UserDto>> => {
  const followService = new FollowServiceBE(new DynamoFactoryDAO());
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
