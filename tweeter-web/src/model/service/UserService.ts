import { AuthToken, FakeData, User } from "tweeter-shared";
import { Buffer } from "buffer";

export class UserService {
  public login = async (
    alias: string,
    password: string,
  ): Promise<[User, AuthToken]> => {
    // TODO: [2a done] Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid alias or password");
    }

    return [user, FakeData.instance.authToken];
  };

  public register = async (
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string,
  ): Promise<[User, AuthToken]> => {
    // Not needed now, but will be needed when you make the request to the server in milestone 3
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    // TODO: [2a done] Replace with the result of calling the server
    const user = FakeData.instance.firstUser;

    if (user === null) {
      throw new Error("Invalid registration");
    }

    return [user, FakeData.instance.authToken];
  };

  public getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: [2a done] Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  public logout = async (authToken: AuthToken): Promise<void> => {
    // Pause so we can see the logging out message.
    // TODO: Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };
}
