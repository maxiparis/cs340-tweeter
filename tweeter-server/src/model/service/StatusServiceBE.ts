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

  public async postStatus(
    authToken: string,
    newStatus: StatusDto,
  ): Promise<void> {
    // Eventually we insert the status in the DB.
  }

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
