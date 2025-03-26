// Domain
export { Follow } from "./model/domain/Follow";
export { PostSegment, Type } from "./model/domain/PostSegment";
export { Status } from "./model/domain/Status";
export { User } from "./model/domain/User";
export { AuthToken } from "./model/domain/AuthToken";

// All classes that should be available to other modules need to exported here. export * does not work when
// uploading to lambda. Instead, we have to list each export.
export { FakeData } from "./util/FakeData";

// DTOs
export type { UserDto } from "./model/dto/UserDto";
export type { StatusDto } from "./model/dto/StatusDto";
export type { AuthTokenDto } from "./model/dto/AuthTokenDto";

// Requests
export type {
  TweeterRequest,
  UserAliasRequest,
  BaseRequest,
} from "./model/net/request/TweeterRequest";
export type { PagedItemRequest } from "./model/net/request/PagedItemRequest";
export type { CheckIsFollowerRequest } from "./model/net/request/CheckIsFollowerRequest";
export type { PostStatusRequest } from "./model/net/request/PostStatusRequest";
export type { LoginRequest } from "./model/net/request/LoginRequest";
export type { RegisterRequest } from "./model/net/request/RegisterRequest";

//Responses
export type { TweeterResponse } from "./model/net/response/TweeterResponse";
export type { PagedItemResponse } from "./model/net/response/PagedItemResponse";
export type { CheckIsFollowerResponse } from "./model/net/response/CheckIsFollowerResponse";
export type { GetFollowCountResponse } from "./model/net/response/GetFollowCountResponse";
export type { FollowerFolloweeCountResponse } from "./model/net/response/FollowerFolloweeCountResponse";
export type { LoginResponse } from "./model/net/response/LoginResponse";
export type { GetUserResponse } from "./model/net/response/GetUserResponse";
