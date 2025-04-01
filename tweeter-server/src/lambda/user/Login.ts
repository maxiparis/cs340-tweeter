import { UserServiceBE } from "../../model/service/UserServiceBE";
import { LoginRequest, LoginResponse } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";

export const handler = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const service = new UserServiceBE(new UserDAO());
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
};
