import {
  CheckIsFollowerRequest,
  CheckIsFollowerResponse,
} from "tweeter-shared";
import { FollowServiceBE } from "../../model/service/FollowServiceBE";

export const handler = async (
  request: CheckIsFollowerRequest,
): Promise<CheckIsFollowerResponse> => {
  const followService = new FollowServiceBE();
  const isFollower = await followService.fetchIsFollowerStatus(
    request.token,
    request.userAlias,
    request.displayedUserAlias,
  );
  return {
    success: true,
    message: null,
    isFollower: isFollower,
  };
};
