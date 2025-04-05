import { IUserDAO } from "../UserDAO";
import { IAuthTokenDAO } from "../AuthTokenDAO";
import { IProfilePicturesDAO } from "../ProfilePicturesDAO";
import { IFollowsDAO } from "../FollowsDAO";
import { IStoryDAO } from "../StoryDAO";

export interface IFactoryDAO {
  getUserDAO(): IUserDAO;
  getAuthTokenDAO(): IAuthTokenDAO;
  getProfilePicturesDAO(): IProfilePicturesDAO;
  getFollowsDAO(): IFollowsDAO;
  getStoryDAO(): IStoryDAO;
}
