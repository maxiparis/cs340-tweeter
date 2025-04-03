import { IFactoryDAO } from "./IFactoryDAO";
import { IUserDAO, UserDAO } from "../UserDAO";
import { AuthTokenDAO, IAuthTokenDAO } from "../AuthTokenDAO";
import { IProfilePicturesDAO, ProfilePicturesDAO } from "../ProfilePicturesDAO";

export class DynamoFactoryDAO implements IFactoryDAO {
  getUserDAO(): IUserDAO {
    return new UserDAO();
  }
  getAuthTokenDAO(): IAuthTokenDAO {
    return new AuthTokenDAO();
  }
  getProfilePicturesDAO(): IProfilePicturesDAO {
    return new ProfilePicturesDAO();
  }
}
