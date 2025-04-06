import { StatusServiceBE } from "../../model/service/StatusServiceBE";
import { PagedItemRequest, PagedItemResponse, StatusDto } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: PagedItemRequest<StatusDto>,
): Promise<PagedItemResponse<StatusDto>> => {
  try {
    const service = new StatusServiceBE(new DynamoFactoryDAO());
    const [items, hasMore] = await service.fetchMoreFeedItems(
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
  } catch (error) {
    // @ts-ignore
    throw new Error("[BadRequest] " + error.message);
  }
};
