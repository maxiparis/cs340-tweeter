import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";
import { FollowerFolloweeCountResponse, TweeterRequest } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<FollowerFolloweeCountResponse> => {
  const followService = new FollowServiceDAO();
  const [followerCount, followeeCount] = await followService.processFollow(
    request.token,
    request.userAlias,
  );

  return {
    success: true,
    message: null,
    followerCount,
    followeeCount,
  };
};
