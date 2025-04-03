import { UserServiceBE } from "../../model/service/UserServiceBE";
import {
  LoginResponse,
  RegisterRequest,
  TweeterResponse,
} from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: RegisterRequest,
): Promise<LoginResponse | TweeterResponse> => {
  const service = new UserServiceBE(new DynamoFactoryDAO());
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
