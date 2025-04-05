import { FakeData, User, UserDto } from "tweeter-shared";
import { IFollowsDAO } from "../DAO/FollowsDAO";
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";
import { IAuthTokenDAO } from "../DAO/AuthTokenDAO";
import { IUserDAO } from "../DAO/UserDAO";

export type FollowOperation = "follow" | "unfollow";

export class FollowServiceBE {
  private followsDAO: IFollowsDAO;
  private authtokenDAO: IAuthTokenDAO;
  private userDAO: IUserDAO;

  constructor(factoryDAO: IFactoryDAO) {
    this.followsDAO = factoryDAO.getFollowsDAO();
    this.authtokenDAO = factoryDAO.getAuthTokenDAO();
    this.userDAO = factoryDAO.getUserDAO();
  }

  public async fetchMoreFollowers(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    await this.validateToken(token);

    let response = await this.followsDAO.getPageOfFollowers(
      userAlias,
      pageSize,
      lastItem?.alias ?? undefined,
    );

    return [response.values, response.hasMorePages];
  }

  public async fetchMoreFollowees(
    token: string,
    userAlias: string,
    pageSize: number,
    lastItem: UserDto | null,
  ): Promise<[UserDto[], boolean]> {
    await this.validateToken(token);

    let response = await this.followsDAO.getPageOfFollowees(
      userAlias,
      pageSize,
      lastItem?.alias ?? undefined,
    );

    return [response.values, response.hasMorePages];
  }

  public async fetchIsFollowerStatus(
    authToken: string,
    user: string,
    selectedUser: string,
  ) {
    await this.validateToken(authToken);
    return await this.followsDAO.checkIsFollower(user, selectedUser);
  }

  public async fetchFolloweeCount(authToken: string, user: string) {
    await this.validateToken(authToken);
    return await this.followsDAO.getFolloweesCount(user);
  }

  public async fetchFollowerCount(authToken: string, user: string) {
    await this.validateToken(authToken);
    return await this.followsDAO.getFollowersCount(user);
  }

  private async validateToken(authToken: string): Promise<string> {
    let userValidated = await this.authtokenDAO.validToken(authToken);
    if (userValidated == null) {
      throw new Error("Invalid token");
    }
    return userValidated;
  }

  public async updateFollowStatus(
    authToken: string,
    userToFollowUnfollow: string,
    operation: FollowOperation,
  ): Promise<[followerCount: number, followeeCount: number]> {
    let aliasSender = await this.validateToken(authToken);

    // Do logic in DB according to operation
    // ......
    if (operation === "follow") {
      let senderUser = await this.userDAO.getUserByAlias(aliasSender);
      let receiverUser =
        await this.userDAO.getUserByAlias(userToFollowUnfollow);

      if (senderUser == null || receiverUser == null) {
        throw new Error("Sender or receiver not found");
      }

      await this.followsDAO.follow(senderUser.dto(), receiverUser.dto());
    } else {
      // unfollow
      await this.followsDAO.unfollow(aliasSender, userToFollowUnfollow);
    }

    const { followerCount, followeeCount } =
      await this.fetchFollowerFolloweeCount(userToFollowUnfollow);

    return [followerCount, followeeCount];
  }

  // ---------------------------------------
  // ---------------- UTILS ----------------

  private async fetchFollowerFolloweeCount(userAlias: string) {
    const followerCount = await this.fetchFollowerCountNoToken(userAlias);
    const followeeCount = await this.fetchFolloweeCountNoToken(userAlias);
    return { followerCount, followeeCount };
  }

  private async fetchFollowerCountNoToken(user: string) {
    return await this.followsDAO.getFollowersCount(user);
  }

  private async fetchFolloweeCountNoToken(user: string) {
    return await this.followsDAO.getFolloweesCount(user);
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
