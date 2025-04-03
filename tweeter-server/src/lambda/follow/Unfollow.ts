import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import {
  FollowerFolloweeCountResponse,
  TweeterRequest,
  UserAliasRequest,
} from "tweeter-shared";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<FollowerFolloweeCountResponse> => {
  const followService = new FollowServiceBE(new DynamoFactoryDAO());
  const [followerCount, followeeCount] = await followService.updateFollowStatus(
    request.token,
    request.userAlias,
    "unfollow",
  );

  return {
    success: true,
    message: null,
    followerCount,
    followeeCount,
  };
};
