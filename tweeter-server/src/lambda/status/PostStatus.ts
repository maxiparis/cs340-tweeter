import { StatusServiceBE } from "../../model/service/StatusServiceBE";
import { PostStatusRequest, TweeterResponse } from "tweeter-shared";

export const handler = async (
  request: PostStatusRequest,
): Promise<TweeterResponse> => {
  const service = new StatusServiceBE();
  await service.postStatus(request.token, request.status);

  return {
    success: true,
    message: null,
  };
};
