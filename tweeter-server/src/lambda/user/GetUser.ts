import { UserServiceBE } from "../../model/service/UserServiceBE";
import { GetUserResponse, UserAliasRequest } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<GetUserResponse> => {
  const service = new UserServiceBE(new UserDAO());
  const user = await service.fetchUser(request.token, request.userAlias);

  return {
    success: true,
    message: null,
    user: user,
  };
};
