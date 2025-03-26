import { BaseRequest } from "./TweeterRequest";

export interface LoginRequest extends BaseRequest {
  readonly alias: string;
  readonly password: string;
}
