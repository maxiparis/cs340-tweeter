import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { FollowerFolloweeCountResponse } from "tweeter-shared";
import { UserAliasRequest } from "tweeter-shared/dist/model/net/request/TweeterRequest";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: UserAliasRequest,
): Promise<FollowerFolloweeCountResponse> => {
  try {
    const followService = new FollowServiceBE(new DynamoFactoryDAO());
    const [followerCount, followeeCount] =
      await followService.updateFollowStatus(
        request.token,
        request.userAlias,
        "follow",
      );

    return {
      success: true,
      message: null,
      followerCount,
      followeeCount,
    };
  } catch (error) {
    // @ts-ignore
    throw new Error("[BadRequest] " + error.message);
  }
};
