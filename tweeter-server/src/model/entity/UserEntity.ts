import { UserDto } from "tweeter-shared";

export class UserEntity {
  firstName: string;
  lastName: string;
  alias: string;
  imageUrl: string;
  hashedPassword: string;

  constructor(userDto: UserDto, hashedPassword: string) {
    this.firstName = userDto.firstName;
    this.lastName = userDto.lastName;
    this.alias = userDto.alias;
    this.imageUrl = userDto.imageUrl;
    this.hashedPassword = hashedPassword;
  }

  dto(): UserDto {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      alias: this.alias,
      imageUrl: this.imageUrl,
    };
  }
}
