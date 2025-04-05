// -------------------------------------------
// ---------------- Interface ----------------

import { IStoryDAO } from "../StoryDAO";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { StoryEntity } from "../../entity/StoryEntity";
import { FeedEntity } from "../../entity/FeedEntity";

export interface IFeedDAO {
  insert(feedEntity: FeedEntity): Promise<void>;
}

// ------------------------------------------------
// ---------------- Concrete Class ----------------

export class FeedDAO implements IFeedDAO {
  readonly tableName = "tweeter-story";

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
}
