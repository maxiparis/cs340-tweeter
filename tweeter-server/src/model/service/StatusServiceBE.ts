import { FakeData, Status, StatusDto } from "tweeter-shared";
import { AuthServiceBE } from "./AuthServiceBE";
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";

export class StatusServiceBE extends AuthServiceBE {
  constructor(factoryDAO: IFactoryDAO) {
    super(factoryDAO);
  }

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
    await this.validateToken(authToken);
    // Eventually we insert the status in the DB
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
