import { StatusDto } from "tweeter-shared";

export class FeedEntity {
  receiver_alias: string;
  isodate_sender: string; //"this should be a string like {isodate}+amy"
  status_dto: StatusDto;

  constructor(
    status: StatusDto,
    receiver_alias: string,
    isodate_sender: string,
  ) {
    this.status_dto = status;
    this.receiver_alias = receiver_alias;
    this.isodate_sender = isodate_sender;
  }

  // dto(): StatusDto {
  //   return this.status_dto;
  // }
}
