import { UserServiceBE } from "../../model/service/UserServiceBE";
import { TweeterRequest, TweeterResponse } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: TweeterRequest,
): Promise<TweeterResponse> => {
  const service = new UserServiceBE(new DynamoFactoryDAO());
  await service.processLogout(request.token);

  return {
    success: true,
    message: null,
  };
};
