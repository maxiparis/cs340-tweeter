export interface BaseRequest {}

export interface TweeterRequest extends BaseRequest {
  readonly token: string;
}

export interface UserAliasRequest extends TweeterRequest {
  /** from TweeterRequest:
    - readonly token: string;
  **/

  readonly userAlias: string;
}
