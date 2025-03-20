import { TweeterRequest } from "./TweeterRequest";

export interface CheckIsFollowerRequest extends TweeterRequest {
  readonly displayedUserAlias: string; // we are gonna check if the logged in user follows this user.
}
