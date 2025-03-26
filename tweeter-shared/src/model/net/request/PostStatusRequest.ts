import { StatusDto } from "../../dto/StatusDto";
import { TweeterRequest } from "./TweeterRequest";

//This only inherits fromn TweeterRequest because I don't need a userAlias
export interface PostStatusRequest extends TweeterRequest {
  readonly status: StatusDto;
}
