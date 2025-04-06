import {
  CheckIsFollowerRequest,
  CheckIsFollowerResponse,
} from "tweeter-shared";
import { FollowServiceBE } from "../../model/service/FollowServiceBE";
import { DynamoFactoryDAO } from "../../model/DAO/factory/DynamoFactoryDAO";

export const handler = async (
  request: CheckIsFollowerRequest,
): Promise<CheckIsFollowerResponse> => {
  try {
    const followService = new FollowServiceBE(new DynamoFactoryDAO());
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
  } catch (error) {
    // @ts-ignore
    throw new Error("[BadRequest] " + error.message);
  }
};
