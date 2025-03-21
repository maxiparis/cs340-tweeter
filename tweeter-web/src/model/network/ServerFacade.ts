import {
  CheckIsFollowerRequest,
  CheckIsFollowerResponse,
  FollowerFolloweeCountResponse,
  GetFollowCountResponse,
  PagedItemRequest,
  PagedItemResponse,
  TweeterRequest,
  User,
  UserDto,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  // Singleton Implementation
  private static _instance: ServerFacade;

  private constructor() {}

  /**
   * Returns the singleton instance.
   */
  public static get instance(): ServerFacade {
    if (ServerFacade._instance == null) {
      ServerFacade._instance = new ServerFacade();
    }

    return this._instance;
  }

  private SERVER_URL =
    "https://j9xph4tr9f.execute-api.us-east-1.amazonaws.com/dev";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  // --------------------------------------------
  // ------------ Reaching EndPoints ------------

  public async loadMoreFollowees(
    request: PagedItemRequest<UserDto>,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedItemRequest<UserDto>,
      PagedItemResponse<UserDto>
    >(request, "/followee/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followees found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async loadMoreFollowers(
    request: PagedItemRequest<UserDto>,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedItemRequest<UserDto>,
      PagedItemResponse<UserDto>
    >(request, "/follower/list");

    // Convert the UserDto array returned by ClientCommunicator to a User array
    const items: User[] | null =
      response.success && response.items
        ? response.items.map((dto) => User.fromDto(dto) as User)
        : null;

    // Handle errors
    if (response.success) {
      if (items == null) {
        throw new Error(`No followers found`);
      } else {
        return [items, response.hasMore];
      }
    } else {
      console.error(response);
      throw new Error(response.message ?? undefined);
    }
  }

  public async loadIsFollowerStatus(request: CheckIsFollowerRequest) {
    const response = await this.clientCommunicator.doPost<
      CheckIsFollowerRequest,
      CheckIsFollowerResponse
    >(request, "/follower/check");

    if (response.success) {
      return response.isFollower;
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in getIsFollowerStatus",
      );
    }
  }

  public async loadFolloweeCount(request: TweeterRequest) {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      GetFollowCountResponse
    >(request, "/followee/count");

    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in loadFolloweeCount",
      );
    }
  }

  public async loadFollowerCount(request: TweeterRequest) {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      GetFollowCountResponse
    >(request, "/follower/count");

    if (response.success) {
      return response.count;
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in loadFollowerCount",
      );
    }
  }

  public async loadFollowResponse(
    request: TweeterRequest,
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      FollowerFolloweeCountResponse
    >(request, "/follower/follow");

    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in loadFollowResponse",
      );
    }
  }

  public async loadUnfollowResponse(
    request: TweeterRequest,
  ): Promise<[followerCount: number, followeeCount: number]> {
    const response = await this.clientCommunicator.doPost<
      TweeterRequest,
      FollowerFolloweeCountResponse
    >(request, "/follower/unfollow");

    if (response.success) {
      return [response.followerCount, response.followeeCount];
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in loadUnfollowResponse",
      );
    }
  }
}
