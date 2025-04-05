import { StatusDto } from "tweeter-shared";

export class StoryEntity {
  sender_alias: string;
  timestamp: number;
  status_dto: StatusDto;

  constructor(status: StatusDto) {
    this.status_dto = status;
    this.sender_alias = status.user.alias;
    this.timestamp = status.timestamp;
  }

  dto(): StatusDto {
    return this.status_dto;
  }
}
