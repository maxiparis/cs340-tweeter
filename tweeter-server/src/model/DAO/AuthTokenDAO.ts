import { AuthTokenDto } from "tweeter-shared";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { AuthTokenEntity } from "../entity/AuthTokenEntity";

export interface IAuthTokenDAO {
  insert(authToken: AuthTokenDto, alias: string): Promise<void>;
  revoke(token: string): Promise<void>;
  validToken(token: string): Promise<boolean>;
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

  async validToken(token: string) {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: `#tokenAttr=:tokenString`,
      ExpressionAttributeNames: {
        "#tokenAttr": this.tokenAttr,
      },
      ExpressionAttributeValues: {
        ":tokenString": token,
      },
    };

    let response = await this.client.send(new QueryCommand(params));
    if (response.Items?.length) {
      const item = response.Items[0];
      let tokenEntity = {
        token: item[this.tokenAttr],
        alias: item[this.aliasAttr],
        date_created: item[this.dateCreatedAttr],
        revoked: item[this.revokedAttr],
      } as AuthTokenEntity;

      if (tokenEntity.revoked) {
        return false;
      }

      const now = new Date().getTime();
      const dateCreated = new Date(tokenEntity.date_created).getTime();
      const differenceInMillis = now - dateCreated;

      // Token can't have more than one hour, else it is expired
      if (differenceInMillis <= 3600000) {
        // 3600000 ms = 1 hour
        return true;
      }
    }
    return false;
  }
}
