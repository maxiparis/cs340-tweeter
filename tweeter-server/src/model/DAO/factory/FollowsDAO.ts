import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export interface IFollowsDAO {
  getFolloweesCount(alias: string): Promise<number>;
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
}
