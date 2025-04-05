// -------------------------------------------
// ---------------- Interface ----------------
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { StatusEntity } from "../entity/StatusEntity";

export interface IStoryDAO {
  insert(status: StatusEntity): Promise<void>;
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
}
