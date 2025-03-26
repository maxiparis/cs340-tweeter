import { UserServiceBE } from "../../model/service/UserServiceBE";
import { TweeterRequest, TweeterResponse } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<TweeterResponse> => {
  const service = new UserServiceBE();
  await service.processLogout(request.token);

  return {
    success: true,
    message: null,
  };
};
