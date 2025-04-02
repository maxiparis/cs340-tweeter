import { UserServiceBE } from "../../model/service/UserServiceBE";
import { LoginRequest, LoginResponse } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";
import { AuthTokenDAO } from "../../model/DAO/AuthTokenDAO";
import { ProfilePicturesDAO } from "../../model/DAO/ProfilePicturesDAO";

export const handler = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const service = new UserServiceBE(
    new UserDAO(),
    new AuthTokenDAO(),
    new ProfilePicturesDAO(),
  );

  try {
    const [user, token] = await service.processLogin(
      request.alias,
      request.password,
    );

    return {
      success: true,
      message: null,
      user,
      token,
    };
  } catch (error) {
    // @ts-ignore
    throw new Error("[BadRequest] " + error.message);
  }
};
