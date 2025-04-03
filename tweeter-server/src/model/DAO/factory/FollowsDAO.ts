import { IUserDAO } from "../UserDAO";

export interface IFollowsDAO {
  getFolloweesCount(alias: string): Promise<number>;
}

export class FollowsDAO implements IFollowsDAO {
  async getFolloweesCount(alias: string): Promise<number> {
    //TODO: implement
    return 1997;
  }
}
