import { AuthToken, FakeData, User, UserDto } from "tweeter-shared";

export class FollowServiceDAO {
  public async fetchMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async fetchMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    return this.getFakeData(lastItem, pageSize, userAlias);
  }

  public async fetchIsFollowerStatus(
    authToken: string,
    user: string,
    selectedUser: string,
  ) {
    return FakeData.instance.isFollower();
  }

  public async fetchFolloweeCount(authToken: string, user: string) {
    return FakeData.instance.getFolloweeCount(user);
  }

  public async fetchFollowerCount(authToken: string, user: string) {
    return FakeData.instance.getFollowerCount(user);
  }

  public async follow(
    authToken: AuthToken,
    userToFollow: User,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Pause so we can see the follow message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: [2a done] Call the server

    const followerCount = await this.fetchFollowerCount(
      authToken.token,
      userToFollow.alias,
    );
    const followeeCount = await this.fetchFolloweeCount(
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

    const followerCount = await this.fetchFollowerCount(
      authToken.token,
      userToUnfollow.alias,
    );
    const followeeCount = await this.fetchFolloweeCount(
      authToken.token,
      userToUnfollow.alias,
    );

    return [followerCount, followeeCount];
  }

  private async getFakeData(
    lastItem: UserDto | null,
    pageSize: number,
    userAlias: string,
  ): Promise<[UserDto[], boolean]> {
    const [items, hasMore] = FakeData.instance.getPageOfUsers(
      User.fromDto(lastItem),
      pageSize,
      userAlias,
    );

    const dtos: UserDto[] = items.map((user) => user.dto);
    return [dtos, hasMore];
  }
}
