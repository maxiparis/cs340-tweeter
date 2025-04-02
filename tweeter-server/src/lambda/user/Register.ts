import { UserServiceBE } from "../../model/service/UserServiceBE";
import {
  LoginResponse,
  RegisterRequest,
  TweeterResponse,
} from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";
import { AuthTokenDAO } from "../../model/DAO/AuthTokenDAO";

export const handler = async (
  request: RegisterRequest,
): Promise<LoginResponse | TweeterResponse> => {
  const service = new UserServiceBE(new UserDAO(), new AuthTokenDAO());
  try {
    const [user, token] = await service.processRegister(request);
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
