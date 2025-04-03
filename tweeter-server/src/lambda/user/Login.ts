import { UserServiceBE } from "../../model/service/UserServiceBE";
import { LoginRequest, LoginResponse } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const service = new UserServiceBE(new DynamoFactoryDAO());

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
