import {
  CheckIsFollowerRequest,
  CheckIsFollowerResponse,
  GetFolloweeCountResponse,
  PagedUserItemRequest,
  PagedUserItemResponse,
  TweeterRequest,
  User,
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

  public async loadMoreFollowees(
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
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
    request: PagedUserItemRequest,
  ): Promise<[User[], boolean]> {
    const response = await this.clientCommunicator.doPost<
      PagedUserItemRequest,
      PagedUserItemResponse
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
      GetFolloweeCountResponse
    >(request, "/followee/count");

    if (response.success) {
      return response.followeeCount;
    } else {
      console.error(response);
      throw new Error(
        response.message ?? "An error happened in loadFolloweeCount",
      );
    }
  }
}
