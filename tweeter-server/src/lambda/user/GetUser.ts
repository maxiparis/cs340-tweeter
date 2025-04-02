import { UserServiceBE } from "../../model/service/UserServiceBE";
import { GetUserResponse, UserAliasRequest } from "tweeter-shared";
import { UserDAO } from "../../model/DAO/UserDAO";
import { AuthTokenDAO } from "../../model/DAO/AuthTokenDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<GetUserResponse> => {
  const service = new UserServiceBE(new UserDAO(), new AuthTokenDAO());
  const user = await service.fetchUser(request.token, request.userAlias);

  return {
    success: true,
    message: null,
    user: user,
  };
};
