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

      expect(page).toBeDefined();
      expect(Array.isArray(page)).toBe(true);
      expect(more).toBeDefined();

      if (more) {
        expect(page.length).toBe(pageSize);
      } else {
        expect(page.length).toBeLessThan(pageSize);
      }

      hasMore = more;
      lastItem = page[page.length - 1];
      i++;
    }
  });
});
