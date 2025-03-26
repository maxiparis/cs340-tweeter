import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { GetFollowCountResponse, UserAliasRequest } from "tweeter-shared";

export const handler = async (
  request: UserAliasRequest,
): Promise<GetFollowCountResponse> => {
  const followService = new FollowServiceBE();
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
