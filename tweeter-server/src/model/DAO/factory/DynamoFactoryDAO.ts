import { IFactoryDAO } from "./IFactoryDAO";
import { IUserDAO, UserDAO } from "../UserDAO";
import { AuthTokenDAO, IAuthTokenDAO } from "../AuthTokenDAO";
import { IProfilePicturesDAO, ProfilePicturesDAO } from "../ProfilePicturesDAO";
import { FollowsDAO, IFollowsDAO } from "../FollowsDAO";
import { IStoryDAO, StoryDAO } from "../StoryDAO";
import { FeedDAO, IFeedDAO } from "./FeedDAO";

export class DynamoFactoryDAO implements IFactoryDAO {
  getFollowsDAO(): IFollowsDAO {
    return new FollowsDAO();
  }
  getUserDAO(): IUserDAO {
    return new UserDAO();
  }
  getAuthTokenDAO(): IAuthTokenDAO {
    return new AuthTokenDAO();
  }
  getProfilePicturesDAO(): IProfilePicturesDAO {
    return new ProfilePicturesDAO();
  }
  getStoryDAO(): IStoryDAO {
    return new StoryDAO();
  }

  getFeedDAO(): IFeedDAO {
    return new FeedDAO();
  }
}
