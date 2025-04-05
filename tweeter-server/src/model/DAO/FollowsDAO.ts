import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { UserDto } from "tweeter-shared";
import { DataPage } from "../entity/DataPage";

// --------------------------------------------
// ---------------- IFollowsDAO ---------------

export interface IFollowsDAO {
  getFolloweesCount(alias: string): Promise<number>;
  getFollowersCount(followerAlias: string): Promise<number>;
  follow(sender: UserDto, receiver: UserDto): Promise<void>;
  unfollow(sender: string, receiver: string): Promise<void>;
  checkIsFollower(
    followerAlias: string,
    followeeAlias: string,
  ): Promise<boolean>;
  getPageOfFollowers(
    followeeHandle: string,
    pageSize: number,
    lastFollowerHandle: string | undefined,
  ): Promise<DataPage<UserDto>>;
  getPageOfFollowees(
    followerHandle: string,
    pageSize: number,
    lastFolloweeHandle: string | undefined,
  ): Promise<DataPage<UserDto>>;
  getFollowersAliases(alias: string): Promise<string[]>;
}

// ------------------------------------------
// ---------------- FollowsDAO ----------------

export class FollowsDAO implements IFollowsDAO {
  readonly tableName = "follows";
  readonly indexName = "follows_index";

  readonly followerHandleAttr = "follower_handle";
  readonly followeeHandleAttr = "followee_handle";
  readonly followerUserAttr = "follower_user";
  readonly followeeUserAttr = "followee_user";

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
  async follow(sender: UserDto, receiver: UserDto): Promise<void> {
    const params = {
      TableName: this.tableName,
      Item: {
        follower_handle: sender.alias,
        followee_handle: receiver.alias,
        [this.followerUserAttr]: JSON.stringify(sender),
        [this.followeeUserAttr]: JSON.stringify(receiver),
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

  //Returns true if followerAlias follows followeeAlias
  async checkIsFollower(
    followerAlias: string,
    followeeAlias: string,
  ): Promise<boolean> {
    const params = {
      TableName: this.tableName,
      KeyConditionExpression:
        "follower_handle = :follower_handle AND followee_handle = :followee_handle",
      ExpressionAttributeValues: {
        ":follower_handle": followerAlias,
        ":followee_handle": followeeAlias,
      },
    };

    let response = await this.client.send(new QueryCommand(params));
    return (response.Items?.length ?? -1) > 0;
  }

  async getPageOfFollowers(
    followeeHandle: string,
    pageSize: number,
    lastFollowerHandle: string | undefined,
  ): Promise<DataPage<UserDto>> {
    const params = {
      IndexName: this.indexName, // Use the index
      KeyConditionExpression: "followee_handle = :followee_handle",
      ExpressionAttributeValues: {
        ":followee_handle": followeeHandle,
      },
      TableName: this.tableName,
      Limit: pageSize,
      ExclusiveStartKey:
        lastFollowerHandle === undefined
          ? undefined
          : {
              [this.followerHandleAttr]: lastFollowerHandle,
              [this.followeeHandleAttr]: followeeHandle,
            },
    };

    const items: UserDto[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;
    data.Items?.forEach((item) => {
      // Parse the stringified JSON to handle cases where the attribute is a JSON string
      let user =
        typeof item[this.followerUserAttr] === "string"
          ? (JSON.parse(item[this.followerUserAttr]) as UserDto)
          : (item[this.followerUserAttr] as UserDto);

      items.push(user);
    });
    return new DataPage<UserDto>(items, hasMorePages);
  }

  async getPageOfFollowees(
    followerHandle: string,
    pageSize: number,
    lastFolloweeHandle: string | undefined,
  ): Promise<DataPage<UserDto>> {
    const params = {
      KeyConditionExpression: "follower_handle = :follower_handle",
      ExpressionAttributeValues: {
        ":follower_handle": followerHandle,
      },
      TableName: this.tableName,
      Limit: pageSize,
      ExclusiveStartKey:
        lastFolloweeHandle === undefined
          ? undefined
          : {
              [this.followerHandleAttr]: followerHandle,
              [this.followeeHandleAttr]: lastFolloweeHandle,
            },
    };

    const items: UserDto[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;

    data.Items?.forEach((item) => {
      // Parse the stringified JSON to handle cases where the attribute is a JSON string
      let user =
        typeof item[this.followeeUserAttr] === "string"
          ? (JSON.parse(item[this.followeeUserAttr]) as UserDto)
          : (item[this.followeeUserAttr] as UserDto);

      items.push(user);
    });
    return new DataPage<UserDto>(items, hasMorePages);
  }

  async getFollowersAliases(alias: string): Promise<string[]> {
    const params = {
      TableName: this.tableName,
      IndexName: this.indexName,
      KeyConditionExpression: "followee_handle = :followee_handle",
      ExpressionAttributeValues: {
        ":followee_handle": alias,
      },
    };

    const data = await this.client.send(new QueryCommand(params));
    let followers: string[] = [];

    data.Items?.forEach((item) => {
      if (item[this.followerHandleAttr] !== undefined) {
        followers.push(item[this.followerHandleAttr] as string);
      }
    });

    return followers;
  }
}
