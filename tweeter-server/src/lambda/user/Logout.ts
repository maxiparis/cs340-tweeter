import { UserServiceBE } from "../../model/service/UserServiceBE";
import { TweeterRequest, TweeterResponse } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";

export const handler = async (
  request: TweeterRequest,
): Promise<TweeterResponse> => {
  const service = new UserServiceBE(new UserDAO());
  await service.processLogout(request.token);

  return {
    success: true,
    message: null,
  };
};
