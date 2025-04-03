import { IUserDAO } from "../UserDAO";
import { IAuthTokenDAO } from "../AuthTokenDAO";
import { IProfilePicturesDAO } from "../ProfilePicturesDAO";

export interface IFactoryDAO {
  getUserDAO(): IUserDAO;
  getAuthTokenDAO(): IAuthTokenDAO;
  getProfilePicturesDAO(): IProfilePicturesDAO;
}
