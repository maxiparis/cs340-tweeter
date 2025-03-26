import { UserServiceBE } from "../../model/service/UserServiceBE";
import { LoginRequest, LoginResponse } from "tweeter-shared";

export const handler = async (
  request: LoginRequest,
): Promise<LoginResponse> => {
  const service = new UserServiceBE();
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
