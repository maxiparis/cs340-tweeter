import { UserServiceBE } from "../../model/service/UserServiceBE";
import { TweeterRequest, TweeterResponse } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";
import { AuthTokenDAO } from "../../model/DAO/AuthTokenDAO";
import { ProfilePicturesDAO } from "../../model/DAO/ProfilePicturesDAO";

export const handler = async (
  request: TweeterRequest,
): Promise<TweeterResponse> => {
  const service = new UserServiceBE(
    new UserDAO(),
    new AuthTokenDAO(),
    new ProfilePicturesDAO(),
  );
  await service.processLogout(request.token);

  return {
    success: true,
    message: null,
  };
};
