import { ServerFacade } from "../../src/model/network/ServerFacade";
import "isomorphic-fetch";
import { FakeData } from "tweeter-shared";

describe("ServerFacade - Integration", () => {
  let facade = ServerFacade.instance;

  it("Register", async () => {
    let [user, authToken] = await facade.loadRegister({
      alias: "userAlias",
      password: "userPassword",
      firstName: "John",
      lastName: "Doe",
      imageStringBase64: "base64EncodedImageString",
      imageFileExtension: ".png",
    });

    expect(user).toBeDefined();
    expect(user).toEqual(FakeData.instance.firstUser);

    expect(authToken.token).toBeDefined();
    expect(authToken.timestamp).toBeDefined();
    expect(authToken.token).not.toEqual("");
    expect(authToken.token).toBeTruthy();
  });

  it("GetFollowers", async () => {
    let [followers, hasMore] = await facade.loadMoreFollowers({
      token: "token",
      userAlias: "@bob",
      pageSize: 10,
      lastItem: null,
    });

    expect(hasMore).toBe(true);
    expect(followers).toBeDefined();
    expect(followers.length).toBe(10);

    //random user
    let index = Math.floor(Math.random() * 10);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(10);
    expect(followers[index].alias).toBeDefined();
  });

  it("GetFollowingCount", async () => {
    let number = await facade.loadFolloweeCount({
      token: "token",
      userAlias: "@bob",
    });

    expect(number).toBeDefined();
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(10);
  });
});
