import { FakeData, Status, StatusDto } from "tweeter-shared";
import { AuthServiceBE } from "./AuthServiceBE";
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";
import { IStoryDAO, StoryDAO } from "../DAO/StoryDAO";
import { StatusEntity } from "../entity/StatusEntity";

export class StatusServiceBE extends AuthServiceBE {
  // --------------------------------------------
  // ---------------- Properties ----------------
  private storyDAO: IStoryDAO;

  // ---------------------------------------------
  // ---------------- Constructor ----------------

  constructor(factoryDAO: IFactoryDAO) {
    super(factoryDAO);
    this.storyDAO = factoryDAO.getStoryDAO();
  }

  // ------------------------------------------------
  // ---------------- Fetching Logic ----------------

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
    await this.storyDAO.insert(new StatusEntity(newStatus));
    // Eventually we insert the status in the DB
  }

  // ---------------------------------------
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
