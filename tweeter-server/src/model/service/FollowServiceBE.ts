import { FakeData, User, UserDto } from "tweeter-shared";

export type FollowOperation = "follow" | "unfollow";

export class FollowServiceBE {
  public async fetchMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    return this.getFakePageOfUsers(lastItem, pageSize, userAlias);
  }
  public async fetchMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    return this.getFakePageOfUsers(lastItem, pageSize, userAlias);
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

  public async updateFollowStatus(
    authToken: string,
    userToFollow: string,
    operation: FollowOperation,
  ): Promise<[followerCount: number, followeeCount: number]> {
    // Do logic in DB according to operation
    // ......

    const { followerCount, followeeCount } =
      await this.fetchFollowerFolloweeCount(authToken, userToFollow);

    return [followerCount, followeeCount];
  }

  // ---------------------------------------
  // ---------------- UTILS ----------------

  private async fetchFollowerFolloweeCount(
    authToken: string,
    userToUnfollow: string,
  ) {
    const followerCount = await this.fetchFollowerCount(
      authToken,
      userToUnfollow,
    );
    const followeeCount = await this.fetchFolloweeCount(
      authToken,
      userToUnfollow,
    );
    return { followerCount, followeeCount };
  }

  private async getFakePageOfUsers(
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
