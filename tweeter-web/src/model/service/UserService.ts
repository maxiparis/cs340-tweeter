import { AuthToken, FakeData, User } from "tweeter-shared";
import { Buffer } from "buffer";
import { ServerFacade } from "../network/ServerFacade";

export class UserService {
  public login = async (
    alias: string,
    password: string,
  ): Promise<[User, AuthToken]> => {
    return await ServerFacade.instance.loadLogin({
      alias,
      password,
    });
  };

  public register = async (
    firstName: string,
    lastName: string,
    alias: string,
    password: string,
    userImageBytes: Uint8Array,
    imageFileExtension: string,
  ): Promise<[User, AuthToken]> => {
    const imageStringBase64: string =
      Buffer.from(userImageBytes).toString("base64");

    return await ServerFacade.instance.loadRegister({
      firstName,
      lastName,
      alias,
      password,
      imageStringBase64,
      imageFileExtension,
    });
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
