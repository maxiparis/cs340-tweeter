import { FakeData, Status, StatusDto } from "tweeter-shared";

export class StatusServiceBE {
  public async fetchMoreFeedItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    return this.getFakeStoryFeedItems(lastItem, pageSize);
  }

  public async fetchMoreStoryItems(
    authToken: string,
    userAlias: string,
    pageSize: number,
    lastItem: StatusDto | null,
  ): Promise<[StatusDto[], boolean]> {
    return this.getFakeStoryFeedItems(lastItem, pageSize);
  }

  // public async postStatus(authToken: AuthToken, newStatus: Status) {
  //   // Pause so we can see the logging out message. Remove when connected to the server
  //   console.log("in postStatus");
  //   await new Promise((f) => setTimeout(f, 2000));
  //
  //   // TODO: [2a done] Call the server to post the status
  // }

  // ------------------------------------------
  // ---------------- Utils ----------------

  private getFakeStoryFeedItems(
    lastItem: StatusDto | null,
    pageSize: number,
  ): [StatusDto[], boolean] {
    const [items, hasMore] = FakeData.instance.getPageOfStatuses(
      Status.fromDto(lastItem),
      pageSize,
    );

    const dtos: StatusDto[] = items.map((status) => status.dto);
    return [dtos, hasMore];
  }
}
