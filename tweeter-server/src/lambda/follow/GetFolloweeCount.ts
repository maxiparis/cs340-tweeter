import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";
import { GetFolloweeCountResponse, TweeterRequest } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<GetFolloweeCountResponse> => {
  const followService = new FollowServiceDAO();
  const followeeCount = await followService.getFolloweeCount(
    request.token,
    request.userAlias,
  );

  return {
    success: true,
    message: null,
    followeeCount: followeeCount,
  };
};
