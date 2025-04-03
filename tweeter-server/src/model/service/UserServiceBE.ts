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
import { IFactoryDAO } from "../DAO/factory/IFactoryDAO";

export class UserServiceBE {
  private userDAO: IUserDAO;
  private authTokenDAO: IAuthTokenDAO;
  private profilePicturesDAO: IProfilePicturesDAO;

  constructor(factoryDAO: IFactoryDAO) {
    this.userDAO = factoryDAO.getUserDAO();
    this.authTokenDAO = factoryDAO.getAuthTokenDAO();
    this.profilePicturesDAO = factoryDAO.getProfilePicturesDAO();
  }

  public processLogin = async (
    alias: string,
    password: string,
  ): Promise<[UserDto, AuthTokenDto]> => {
    let userFound = await this.userDAO.getUserByAlias(alias);
    if (userFound == null) {
      throw new Error("User not found");
    }

    let passwordMatches = await this.comparePassword(
      password,
      userFound.hashedPassword,
    );

    if (!passwordMatches) {
      throw new Error("Bad credentials");
    }

    //create an AuthToken
    let token = await this.createAuthTokenForUser(alias);
    return [userFound.dto(), token];
  };

  public processRegister = async (
    request: RegisterRequest,
  ): Promise<[UserDto, AuthTokenDto]> => {
    //check user exists
    let existentUser = await this.userDAO.getUserByAlias(request.alias);
    if (existentUser != null) {
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
    let token = await this.createAuthTokenForUser(user.alias);

    return [user, token];
  };

  public fetchUser = async (
    token: string,
    alias: string,
  ): Promise<UserDto | null> => {
    return FakeData.instance.findUserByAlias(alias)?.dto ?? null;
  };

  public processLogout = async (token: string): Promise<void> => {
    //Identify user with that token and revoke it
    await this.authTokenDAO.revoke(token);

    return;
  };

  // ---------------------------------------
  // ---------------- Utils ----------------
  private generateFakeUserToken(): [UserDto, AuthTokenDto] {
    const user = FakeData.instance.firstUser;
    return [user!.dto, FakeData.instance.authToken.dto];
  }

  private async hashPassword(plainTextPassword: string): Promise<string> {
    const saltRounds = 3;
    return await bcrypt.hash(plainTextPassword, saltRounds);
  }

  private async comparePassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  }

  private async createAuthTokenForUser(alias: string): Promise<AuthTokenDto> {
    //Insert into AuthTokens, gets token, returns it
    let token = AuthToken.Generate();
    await this.authTokenDAO.insert(token, alias);
    return token.dto;
  }
}
