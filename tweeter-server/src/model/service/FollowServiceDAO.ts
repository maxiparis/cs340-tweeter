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

  public async processFollow(
    authToken: string,
    userToFollow: string,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Do logic in DB

    const followerCount = await this.fetchFollowerCount(
      authToken,
      userToFollow,
    );
    const followeeCount = await this.fetchFolloweeCount(
      authToken,
      userToFollow,
    );

    return [followerCount, followeeCount];
  }

  public async processUnfollow(
    authToken: string,
    userToUnfollow: string,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Do logic in DB

    const followerCount = await this.fetchFollowerCount(
      authToken,
      userToUnfollow,
    );
    const followeeCount = await this.fetchFolloweeCount(
      authToken,
      userToUnfollow,
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
