import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UserDto } from "tweeter-shared";
import { UserEntity } from "../entity/UserEntity";

export interface IUserDAO {
  insertNewUser(user: UserDto, hashed: string): Promise<void>;
  getUserByAlias(alias: string): Promise<UserEntity | null>;
}

export class UserDAO implements IUserDAO {
  readonly tableName = "tweeter-user";

  readonly aliasAttr = "alias";
  readonly firstNameAttr = "firstName";
  readonly lastNameAttr = "lastName";
  readonly imageUrlAttr = "imageUrl";
  readonly hashedPasswordAttr = "hashedPassword";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor() {}

  async getUserByAlias(alias: string) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `${this.aliasAttr}=:alias`,
      ExpressionAttributeValues: {
        ":alias": alias,
      },
    };

    let response = await this.client.send(new QueryCommand(params));
    if (response.Items?.length) {
      const item = response.Items[0];
      return new UserEntity(
        {
          alias: item[this.aliasAttr],
          firstName: item[this.firstNameAttr],
          lastName: item[this.lastNameAttr],
          imageUrl: item[this.imageUrlAttr],
        } as UserDto,
        item[this.hashedPasswordAttr],
      );
    }
    return null;
  }

  async insertNewUser(user: UserDto, hashed: string): Promise<void> {
    if (!user || !hashed) {
      throw new Error(
        "Invalid input. User and hashed password must be provided.",
      );
    }

    if (!user.alias || !user.firstName || !user.lastName || !user.imageUrl) {
      throw new Error(
        "All user properties (alias, firstName, lastName, imageUrl) must be set.",
      );
    }

    const params = {
      TableName: this.tableName,
      Item: {
        [this.aliasAttr]: user.alias,
        [this.firstNameAttr]: user.firstName,
        [this.lastNameAttr]: user.lastName,
        [this.imageUrlAttr]: user.imageUrl,
        [this.hashedPasswordAttr]: hashed,
      },
    };

    await this.client.send(new PutCommand(params));
  }
}
