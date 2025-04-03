import { AuthTokenDto, UserDto } from "tweeter-shared";

export class AuthTokenEntity {
  token: string;
  alias: string;
  date_created: number;
  revoked: boolean;

  constructor(
    token: string,
    alias: string,
    date_created: number,
    revoked: boolean,
  ) {
    this.token = token;
    this.alias = alias;
    this.date_created = date_created;
    this.revoked = revoked;
  }

  dto(): AuthTokenDto {
    return {
      token: this.token,
      timestamp: this.date_created,
    };
  }
}
