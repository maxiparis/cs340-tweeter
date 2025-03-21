import { AuthToken, Status } from "tweeter-shared";
import { ServerFacade } from "../network/ServerFacade";

export default class StatusService {
  public async loadMoreFeedItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    let lastItemDto = lastItem?.dto ?? null;
    return ServerFacade.instance.loadMoreFeedItems({
      token: authToken.token,
      userAlias,
      pageSize,
      lastItem: lastItemDto,
    });
  }

  public async loadMoreStoryItems(
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null,
  ): Promise<[Status[], boolean]> {
    let lastItemDto = lastItem?.dto ?? null;

    return ServerFacade.instance.loadMoreStoryItems({
      token: authToken.token,
      userAlias,
      pageSize,
      lastItem: lastItemDto,
    });
  }

  public async postStatus(authToken: AuthToken, newStatus: Status) {
    // Pause so we can see the logging out message. Remove when connected to the server
    console.log("in postStatus");
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: [2a done] Call the server to post the status
  }
}
