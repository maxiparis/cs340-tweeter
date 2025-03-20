import { TweeterResponse } from "./TweeterResponse";

export interface CheckIsFollowerResponse extends TweeterResponse {
  readonly isFollower: boolean;
}
