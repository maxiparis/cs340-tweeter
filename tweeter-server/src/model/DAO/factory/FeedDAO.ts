// -------------------------------------------
// ---------------- Interface ----------------

import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { FeedEntity } from "../../entity/FeedEntity";
import { DataPage } from "../../entity/DataPage";
import { StatusDto } from "tweeter-shared";

export interface IFeedDAO {
  insert(feedEntity: FeedEntity): Promise<void>;
  getFeedItems(
    alias: string,
    pageSize: number,
    lastStoryTimestamp: string | undefined,
  ): Promise<DataPage<StatusDto>>;
}

// ------------------------------------------------
// ---------------- Concrete Class ----------------

export class FeedDAO implements IFeedDAO {
  readonly tableName = "tweeter-feed";

  readonly receiverAliasAttr = "receiver_alias";
  readonly isoDateSenderAttr = "isodate_sender";
  readonly statusDtoAttr = "status_dto";

  private readonly client = DynamoDBDocumentClient.from(new DynamoDBClient());

  constructor() {}

  async insert(feedEntity: FeedEntity) {
    const params = {
      TableName: this.tableName,
      Item: {
        //TODO: make sure these are the right properties.
        [this.receiverAliasAttr]: feedEntity.receiver_alias,
        [this.isoDateSenderAttr]: feedEntity.isodate_sender,
        [this.statusDtoAttr]: JSON.stringify(feedEntity.status_dto),
      },
    };

    await this.client.send(new PutCommand(params));
  }

  async getFeedItems(
    alias: string,
    pageSize: number,
    lastStoryTimestamp: string | undefined,
  ): Promise<DataPage<StatusDto>> {
    const params = {
      KeyConditionExpression: `${this.receiverAliasAttr} = :receiverAlias`,
      ExpressionAttributeValues: {
        ":receiverAlias": alias,
      },
      TableName: this.tableName,
      Limit: pageSize,
      ExclusiveStartKey:
        lastStoryTimestamp === undefined
          ? undefined
          : {
              [this.receiverAliasAttr]: alias,
              [this.isoDateSenderAttr]: lastStoryTimestamp,
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
