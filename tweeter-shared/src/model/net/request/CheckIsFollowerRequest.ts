import { UserAliasRequest } from "./TweeterRequest";

export interface CheckIsFollowerRequest extends UserAliasRequest {
  readonly displayedUserAlias: string; // we are gonna check if the logged in user follows this user.
}
