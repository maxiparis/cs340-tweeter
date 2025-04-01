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

  async insertNewUser(user: UserDto, hashed: string): Promise<void> {
    if (!user.alias) {
      throw new Error("Alias is missing in UserDto.");
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
