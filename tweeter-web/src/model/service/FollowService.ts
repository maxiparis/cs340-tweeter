import { AuthToken, FakeData, User } from "tweeter-shared";
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

  public async follow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: [2a done] Call the server

    const followerCount = await this.getFollowerCount(
      authToken.token,
      userToFollow.alias,
    );
    const followeeCount = await this.getFolloweeCount(
      authToken.token,
      userToFollow.alias,
    );

    return [followerCount, followeeCount];
  }

  public async unfollow(
    authToken: AuthToken,
    userToUnfollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the unfollow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: [2a done] Call the server

    const followerCount = await this.getFollowerCount(
      authToken.token,
      userToUnfollow.alias,
    );
    const followeeCount = await this.getFolloweeCount(
      authToken.token,
      userToUnfollow.alias,
    );

    return [followerCount, followeeCount];
  }
}
