import { UserDto } from "../../dto/UserDto";

export interface PagedUserItemRequest {
  readonly token: string;
  readonly userAlias: string;
  readonly pageSize: number;
  readonly lastItem: UserDto | null;
}

// public async loadMoreFollowees(
//   authToken: AuthToken,
//   userAlias: string,
//   pageSize: number,
//   lastItem: User | null,
// ): Promise<[User[], boolean]> {
//   // TODO: [2a done] Replace with the result of calling server
//   return FakeData.instance.getPageOfUsers(lastItem, pageSize, userAlias);
// }
