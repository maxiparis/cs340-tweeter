import {
  AuthToken,
  AuthTokenDto,
  FakeData,
  RegisterRequest,
  UserDto,
} from "tweeter-shared";
import { IUserDAO } from "../DAO/UserDAO";
import bcrypt from "bcryptjs";
import { IAuthTokenDAO } from "../DAO/AuthTokenDAO";
import { IProfilePicturesDAO } from "../DAO/ProfilePicturesDAO";

export class UserServiceBE {
  private userDAO: IUserDAO;
  private authTokenDAO: IAuthTokenDAO;
  private profilePicturesDAO: IProfilePicturesDAO;

  constructor(
    dao: IUserDAO,
    authTokenDAO: IAuthTokenDAO,
    profilePicturesDAO: IProfilePicturesDAO,
  ) {
    this.userDAO = dao;
    this.authTokenDAO = authTokenDAO;
    this.profilePicturesDAO = profilePicturesDAO;
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

    //check user exists
    let usersDuplicated = await this.userDAO.getUserByAlias(request.alias);
    console.log(usersDuplicated);
    if (usersDuplicated.length > 0) {
      throw new Error("User already exists");
    }

    let imageURL = await this.profilePicturesDAO.putImage(
      request.alias,
      request.imageStringBase64,
    );

    let user: UserDto = {
      alias: request.alias,
      firstName: request.firstName,
      imageUrl: imageURL,
      lastName: request.lastName,
    };

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
