import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";
import { GetFollowCountResponse, TweeterRequest } from "tweeter-shared";

export const handler = async (
  request: TweeterRequest,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowServiceDAO();
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
