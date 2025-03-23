import {
  AuthToken,
  AuthTokenDto,
  FakeData,
  RegisterRequest,
  User,
  UserAliasRequest,
  UserDto,
} from "tweeter-shared";
import { Buffer } from "buffer";

export class UserServiceBE {
  public processLogin = async (
    alias: string,
    password: string,
  ): Promise<[UserDto, AuthTokenDto]> => {
    return this.generateFakeUserToken();
  };

  public processRegister = async (
    request: RegisterRequest,
  ): Promise<[UserDto, AuthTokenDto]> => {
    const user = FakeData.instance.firstUser;
    return [user!.dto, FakeData.instance.authToken.dto];
  };

  public fetchUser = async (
    token: string,
    alias: string,
  ): Promise<UserDto | null> => {
    return FakeData.instance.findUserByAlias(alias)?.dto ?? null;
  };

  public logout = async (authToken: AuthToken): Promise<void> => {
    // Pause so we can see the logging out message.
    // TODO: Delete when the call to the server is implemented.
    await new Promise((res) => setTimeout(res, 1000));
  };

  // ------------------------------------------
  // ---------------- Utils ----------------
  private generateFakeUserToken(): [UserDto, AuthTokenDto] {
    const user = FakeData.instance.firstUser;
    return [user!.dto, FakeData.instance.authToken.dto];
  }
}
