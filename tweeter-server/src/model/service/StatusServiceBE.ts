import { FakeData, Status, StatusDto } from "tweeter-shared";
import { AuthServiceBE } from "./AuthServiceBE";
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";
import { IStoryDAO } from "../DAO/StoryDAO";
import { StoryEntity } from "../entity/StoryEntity";
import { IFollowsDAO } from "../DAO/FollowsDAO";
import { IFeedDAO } from "../DAO/factory/FeedDAO";
import { FeedEntity } from "../entity/FeedEntity";

export class StatusServiceBE extends AuthServiceBE {
  // --------------------------------------------
  // ---------------- Properties ----------------
  private storyDAO: IStoryDAO;
  private followsDAO: IFollowsDAO;
  private feedDAO: IFeedDAO;

  // ---------------------------------------------
  // ---------------- Constructor ----------------

  constructor(factoryDAO: IFactoryDAO) {
    super(factoryDAO);
    this.storyDAO = factoryDAO.getStoryDAO();
    this.followsDAO = factoryDAO.getFollowsDAO();
    this.feedDAO = factoryDAO.getFeedDAO();
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
    await this.validateToken(authToken);

    let results = await this.storyDAO.getStoryItems(
      userAlias,
      pageSize,
      lastItem?.timestamp ?? undefined,
    );
    return [results.values, results.hasMorePages];
  }

  public async postStatus(
    authToken: string,
    newStatus: StatusDto,
  ): Promise<void> {
    // Validate the provided authentication token to ensure it is linked to a valid user.
    await this.validateToken(authToken);

    // Insert the new status into the user's story (their own list of posts).
    await this.storyDAO.insert(new StoryEntity(newStatus));

    // Retrieve all follower aliases of the user posting the status.
    let followerAliases = await this.followsDAO.getFollowersAliases(
      newStatus.user.alias,
    );

    // For each follower, create a feed entity that adds the new status
    // to their feed and insert it into the feed database.
    for (let followerAlias of followerAliases) {
      // Create an ISO date string to use for sorting and combine it with the poster's alias.
      let isodate = new Date(newStatus.timestamp).toISOString();
      let isodateReceiver = isodate + newStatus.user.alias;

      // Create a feed entity for the follower to link this new status.
      let entity = new FeedEntity(newStatus, followerAlias, isodateReceiver);

      // Insert the feed entity into the follower's feed.
      await this.feedDAO.insert(entity);
    }
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
