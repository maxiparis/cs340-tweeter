import { AuthToken, User } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";

export class FollowService {
  public async getMoreFollowers(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    return await ServerFacade.instance.loadMoreFollowers({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem?.dto ?? null,
    });
  }

  public async getMoreFollowees(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: User | null,
  ): Promise<[User[], boolean]> {
    return await ServerFacade.instance.loadMoreFollowees({
      token: authToken.token,
      userAlias: userAlias,
      pageSize: pageSize,
      lastItem: lastItem?.dto ?? null,
    });
  }

  public async getIsFollowerStatus(
    authToken: AuthToken,
    userAlias: string,
    selectedUser: string,
  ) {
    return ServerFacade.instance.loadIsFollowerStatus({
      token: authToken.token,
      userAlias: userAlias,
      displayedUserAlias: selectedUser,
    });
  }

  public async getFolloweeCount(
    authToken: string,
    user: string,
  ): Promise<number> {
    return ServerFacade.instance.loadFolloweeCount({
      token: authToken,
      userAlias: user,
    });
  }

  public async getFollowerCount(
    authToken: string,
    user: string,
  ): Promise<number> {
    return ServerFacade.instance.loadFollowerCount({
      token: authToken,
      userAlias: user,
    });
  }

  public async sendFollow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // this will contact the backend, and the backend will return the followerCount, and followeeCount

    return ServerFacade.instance.loadFollowResponse({
      token: authToken.token,
      userAlias: userToFollow.alias,
    });
  }

  public async sendUnfollow(
    authToken: AuthToken,
    userToUnfollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    return ServerFacade.instance.loadUnfollowResponse({
      token: authToken.token,
      userAlias: userToUnfollow.alias,
    });
  }
}
