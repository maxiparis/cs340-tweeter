import { StatusServiceBE } from "../../model/service/StatusServiceBE";
import { PagedItemRequest, PagedItemResponse, StatusDto } from "tweeter-shared";

export const handler = async (
  request: PagedItemRequest<StatusDto>,
): Promise<PagedItemResponse<StatusDto>> => {
  const service = new StatusServiceBE();
  const [items, hasMore] = await service.fetchMoreStoryItems(
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
