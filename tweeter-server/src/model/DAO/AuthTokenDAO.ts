import { AuthTokenDto } from "tweeter-shared";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface IAuthTokenDAO {
  insert(authToken: AuthTokenDto, alias: string): Promise<void>;
}

export class AuthTokenDAO implements IAuthTokenDAO {
  readonly tableName = "tweeter-authtoken";

  readonly tokenAttr = "token";
  readonly aliasAttr = "alias";
  readonly dateCreated = "date_created";
  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor() {}

  async insert(authToken: AuthTokenDto, alias: string): Promise<void> {
    if (!alias) {
      throw new Error("Alias is missing in AuthTokenDto.");
    }

    if (!authToken.token || !authToken.timestamp) {
      throw new Error("Token or Timestamp is missing in AuthTokenDto.");
    }

    const params = {
      TableName: this.tableName,
      Item: {
        [this.tokenAttr]: authToken.token,
        [this.aliasAttr]: alias,
        [this.dateCreated]: authToken.timestamp,
      },
    };
    await this.client.send(new PutCommand(params));
  }
}
