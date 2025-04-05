// -------------------------------------------
// ---------------- Interface ----------------
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { StatusEntity } from "../entity/StatusEntity";
import { DataPage } from "../entity/DataPage";
import { StatusDto, UserDto } from "tweeter-shared";

export interface IStoryDAO {
  insert(status: StatusEntity): Promise<void>;
  getStoryItems(
    alias: string,
    pageSize: number,
    lastStoryTimestamp: number | undefined,
  ): Promise<DataPage<StatusDto>>;
}

// ------------------------------------------------
// ---------------- Concrete Class ----------------

export class StoryDAO implements IStoryDAO {
  readonly tableName = "tweeter-story";

  readonly senderAliasAttr = "sender_alias";
  readonly timestampAttr = "timestamp";
  readonly statusDtoAttr = "status_dto";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor() {}

  async insert(status: StatusEntity) {
    const params = {
      TableName: this.tableName,
      Item: {
        [this.senderAliasAttr]: status.sender_alias,
        [this.timestampAttr]: status.timestamp,
        [this.statusDtoAttr]: JSON.stringify(status.status_dto),
      },
    };

    await this.client.send(new PutCommand(params));
  }

  async getStoryItems(
    alias: string,
    pageSize: number,
    lastStoryTimestamp: number | undefined,
  ): Promise<DataPage<StatusDto>> {
    const params = {
      KeyConditionExpression: `${this.senderAliasAttr} = :senderAlias`,
      ExpressionAttributeValues: {
        ":senderAlias": alias,
      },
      TableName: this.tableName,
      Limit: pageSize,
      ExclusiveStartKey:
        lastStoryTimestamp === undefined
          ? undefined
          : {
              [this.senderAliasAttr]: alias,
              [this.timestampAttr]: lastStoryTimestamp,
            },
    };

    const items: StatusDto[] = [];
    const data = await this.client.send(new QueryCommand(params));
    const hasMorePages = data.LastEvaluatedKey !== undefined;

    data.Items?.forEach((item) => {
      let user =
        typeof item[this.statusDtoAttr] === "string"
          ? (JSON.parse(item[this.statusDtoAttr]) as StatusDto)
          : (item[this.statusDtoAttr] as StatusDto);

      items.push(user);
    });
    return new DataPage<StatusDto>(items, hasMorePages);
  }
}
