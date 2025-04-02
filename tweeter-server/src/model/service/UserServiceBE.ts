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
import { IUserDAO, UserDAO } from "../DAO/UserDAO";
import bcrypt from "bcryptjs";
import { IAuthTokenDAO } from "../DAO/AuthTokenDAO"; //TODO: upload to server and test

export class UserServiceBE {
  private userDAO: IUserDAO;
  private authTokenDAO: IAuthTokenDAO;
  constructor(dao: IUserDAO, authTokenDAO: IAuthTokenDAO) {
    this.userDAO = dao;
    this.authTokenDAO = authTokenDAO;
  }

  public processLogin = async (
    alias: string,
    password: string,
  ): Promise<[UserDto, AuthTokenDto]> => {
    return this.generateFakeUserToken();
  };

  public processRegister = async (
    request: RegisterRequest,
  ): Promise<[UserDto, AuthTokenDto]> => {
    // const user = FakeData.instance.firstUser;
    const user: UserDto = {
      alias: request.alias,
      firstName: request.firstName,
      imageUrl:
        "https://faculty.cs.byu.edu/~jwilkerson/cs340/tweeter/images/donald_duck.png",
      lastName: request.lastName,
    };

    //check user exists
    let usersDuplicated = await this.userDAO.getUserByAlias(request.alias);
    console.log(usersDuplicated);
    if (usersDuplicated.length > 0) {
      throw new Error("User already exists");
    }

    //TODO: send image to S3, get url

    //Insert into user
    let hashedPassword = await this.hashPassword(request.password);
    await this.userDAO.insertNewUser(user, hashedPassword);

    //Insert into AuthTokens, gets token, returns it
    let token = AuthToken.Generate();
    await this.authTokenDAO.insert(token, user.alias);

    return [user, token.dto];
  };

  public fetchUser = async (
    token: string,
    alias: string,
  ): Promise<UserDto | null> => {
    return FakeData.instance.findUserByAlias(alias)?.dto ?? null;
  };

  public processLogout = async (token: string): Promise<void> => {
    //Identify user with that token and perform DB operations.

    return;
  };

  // ---------------------------------------
  // ---------------- Utils ----------------
  private generateFakeUserToken(): [UserDto, AuthTokenDto] {
    const user = FakeData.instance.firstUser;
    return [user!.dto, FakeData.instance.authToken.dto];
  }

  async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 3;
    return await bcrypt.hash(plainTextPassword, saltRounds);
  }
}
