import { UserServiceBE } from "../../model/service/UserServiceBE";
import { LoginResponse, RegisterRequest } from "tweeter-shared";

export const handler = async (
  request: RegisterRequest,
): Promise<LoginResponse> => {
  const service = new UserServiceBE();
  const [user, token] = await service.processRegister(request);

  return {
    success: true,
    message: null,
    user,
    token,
  };
};
