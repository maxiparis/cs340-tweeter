import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";
import { GetFollowCountResponse, TweeterRequest } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowServiceDAO();
  const followerCount = await followService.fetchFollowerCount(
    request.token,
    request.userAlias,
  );

  return {
    success: true,
    message: null,
    count: followerCount,
  };
};
