import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { FollowerFolloweeCountResponse, TweeterRequest } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<FollowerFolloweeCountResponse> => {
  const followService = new FollowServiceBE();
  const [followerCount, followeeCount] = await followService.updateFollowStatus(
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
};
