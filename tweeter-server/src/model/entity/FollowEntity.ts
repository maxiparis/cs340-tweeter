import { UserDto } from "tweeter-shared";

export class FollowEntity {
  follower_handle: string;
  followee_handle: string;
  followee_user: UserDto;
  follower_user: UserDto;

  constructor(
    followee_handle: string,
    follower_handle: string,
    followee_user: UserDto,
    follower_user: UserDto,
  ) {
    this.followee_handle = followee_handle;
    this.follower_handle = follower_handle;
    this.followee_user = followee_user;
    this.follower_user = follower_user;
  }
}
