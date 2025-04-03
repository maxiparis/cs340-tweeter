import { UserServiceBE } from "../../model/service/UserServiceBE";
import { GetUserResponse, UserAliasRequest } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<GetUserResponse> => {
  const service = new UserServiceBE(new DynamoFactoryDAO());
  const user = await service.fetchUser(request.token, request.userAlias);

  return {
    success: true,
    message: null,
    user: user,
  };
};
