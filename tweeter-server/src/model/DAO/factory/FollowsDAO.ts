import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface IFollowsDAO {
  getFolloweesCount(alias: string): Promise<number>;
  getFollowersCount(followerAlias: string): Promise<number>;
  follow(sender: string, receiver: string): Promise<void>;
  unfollow(sender: string, receiver: string): Promise<void>;
}

export class FollowsDAO implements IFollowsDAO {
  readonly tableName = "follows";
  readonly indexName = "follows_index";

  readonly followerHandleAttr = "follower_handle";
  readonly followeeHandleAttr = "followee_handle";
  readonly followeeNameAttr = "followee_name";
  readonly followerNameAttr = "follower_name";
  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor() {}

  // Returns the number of people the followerAlias follows to.
  async getFolloweesCount(followerAlias: string): Promise<number> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression: "follower_handle = :follower_handle",
      ExpressionAttributeValues: {
        ":follower_handle": followerAlias,
      },
    };

    const output = await this.client.send(new QueryCommand(params));
    return output.Items?.length || 0;
  }

  // Returns the number of people that follows followeeAlias.
  async getFollowersCount(followeeAlias: string): Promise<number> {
    const params = {
      TableName: this.tableName,
      IndexName: this.indexName,
      KeyConditionExpression: "followee_handle = :followee_handle",
      ExpressionAttributeValues: {
        ":followee_handle": followeeAlias,
      },
    };

    const output = await this.client.send(new QueryCommand(params));
    return output.Items?.length || 0;
  }

  // Sender will follow receiver
  async follow(sender: string, receiver: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        follower_handle: sender,
        followee_handle: receiver,
      },
    };

    await this.client.send(new PutCommand(params));
  }

  // Sender will unfollow receiver
  async unfollow(sender: string, receiver: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: {
        [this.followerHandleAttr]: sender,
        [this.followeeHandleAttr]: receiver,
      },
    };

    await this.client.send(new DeleteCommand(params));
  }
}
