import {
  CheckIsFollowerRequest,
  CheckIsFollowerResponse,
} from "tweeter-shared";
import { FollowServiceDAO } from "../../model/service/FollowServiceDAO";

export const handler = async (
  request: CheckIsFollowerRequest,
): Promise<CheckIsFollowerResponse> => {
  const followService = new FollowServiceDAO();
  const isFollower = await followService.getIsFollowerStatus(
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
