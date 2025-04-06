import { StatusServiceBE } from "../../model/service/StatusServiceBE";
import { PostStatusRequest, TweeterResponse } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: PostStatusRequest,
): Promise<TweeterResponse> => {
  try {
    const service = new StatusServiceBE(new DynamoFactoryDAO());
    await service.postStatus(request.token, request.status);

    return {
      success: true,
      message: null,
    };
  } catch (error) {
    // @ts-ignore
    throw new Error("[BadRequest] " + error.message);
  }
};
