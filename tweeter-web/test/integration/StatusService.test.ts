import StatusService from "../../src/model/service/StatusService";
import { AuthToken, PagedItemRequest, Status, StatusDto } from "tweeter-shared";
import "isomorphic-fetch";

describe("StatusService", () => {
  let service = new StatusService();

  it("User story pages", async () => {
    let token = new AuthToken("sadlfjasdf", Date.now());
    let user = "@bob";

    let pageSize = 10;
    let lastItem: Status | null = null;
    let hasMore = true;
    let i = 0;

    while (hasMore) {
      console.log("Iteration:", i);
      let [page, more]: [Status[], boolean] = await service.loadMoreStoryItems(
        token,
        user,
        pageSize,
        lastItem,
      );

      if (more) {
        expect(page.length).toBe(10);
      } else {
        expect(page.length).toBeLessThan(10);
      }

      hasMore = more;
      lastItem = page[page.length - 1];
      i++;
    }
  });
});
