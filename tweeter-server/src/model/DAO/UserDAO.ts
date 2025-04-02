import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UserDto } from "tweeter-shared";

export interface IUserDAO {
  insertNewUser(user: UserDto, hashed: string): Promise<void>;
  getUserByAlias(alias: string): Promise<UserDto | null>; //TODO: maybe fix later on
}

export class UserDAO implements IUserDAO {
  readonly tableName = "tweeter-user";

  readonly aliasAttr = "alias";
  readonly firstNameAttr = "firstName";
  readonly lastNameAttr = "lastName";
  readonly imageUrlAttr = "imageUrl";
  readonly hashedPasswordAttr = "hashedPassword";

  // readonly indexName = "follows_index";

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
      return {
        alias: item[this.aliasAttr],
        firstName: item[this.firstNameAttr],
        lastName: item[this.lastNameAttr],
        imageUrl: item[this.imageUrlAttr],
      } as UserDto;
    }
    return null;
    // return response.Items?.[0] || null; // if we didn't find a user, then return null
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
