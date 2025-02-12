import { AuthToken, FakeData, User } from "tweeter-shared";

export class UserService {
  public login = async (
    alias: string,
    password: string,
  ): Promise<[User, AuthToken]> => {
    // TODO: Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  };
}
