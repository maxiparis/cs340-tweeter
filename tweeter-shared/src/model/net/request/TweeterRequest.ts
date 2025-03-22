export interface TweeterRequest {
  readonly token: string;
}

export interface UserAliasRequest extends TweeterRequest {
  readonly userAlias: string;
}
