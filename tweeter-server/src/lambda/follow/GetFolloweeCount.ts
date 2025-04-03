import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { GetFollowCountResponse, UserAliasRequest } from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowServiceBE(new DynamoFactoryDAO());
  const followeeCount = await followService.fetchFolloweeCount(
    request.token,
    request.userAlias,
  );

  return {
    success: true,
    message: null,
    count: followeeCount,
  };
};
