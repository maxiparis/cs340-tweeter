import { AuthTokenDto } from "tweeter-shared";
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface IAuthTokenDAO {
  insert(authToken: AuthTokenDto, alias: string): Promise<void>;
  revoke(token: string): Promise<void>;
}

export class AuthTokenDAO implements IAuthTokenDAO {
  readonly tableName = "tweeter-authtoken";

  readonly tokenAttr = "token";
  readonly aliasAttr = "alias";
  readonly dateCreatedAttr = "date_created";
  readonly revokedAttr = "revoked";
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
        [this.dateCreatedAttr]: authToken.timestamp,
        [this.revokedAttr]: false,
      },
    };
    await this.client.send(new PutCommand(params));
  }

  async revoke(token: string): Promise<void> {
    try {
      const params = {
        TableName: this.tableName,
        Key: {
          [this.tokenAttr]: token,
        },
        UpdateExpression: `SET ${this.revokedAttr} = :revoked`,
        ExpressionAttributeValues: {
          ":revoked": true,
        },
      };
      await this.client.send(new UpdateCommand(params));
    } catch (error) {
      // do nothing
      console.log(error);
    }
  }
}
