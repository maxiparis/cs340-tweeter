import { IUserDAO } from "../UserDAO";
import { IAuthTokenDAO } from "../AuthTokenDAO";
import { IProfilePicturesDAO } from "../ProfilePicturesDAO";
import { IFollowsDAO } from "../FollowsDAO";
import { IStoryDAO } from "../StoryDAO";
import { IFeedDAO } from "./FeedDAO";

export interface IFactoryDAO {
  getUserDAO(): IUserDAO;
  getAuthTokenDAO(): IAuthTokenDAO;
  getProfilePicturesDAO(): IProfilePicturesDAO;
  getFollowsDAO(): IFollowsDAO;
  getStoryDAO(): IStoryDAO;
  getFeedDAO(): IFeedDAO;
}
