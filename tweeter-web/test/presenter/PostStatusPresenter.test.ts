import PostStatusPresenter from "../../src/presenters/PostStatusPresenter";
import PostStatusView from "../../src/listeners/PostStatusView";
import {
  anything,
  capture,
  instance,
  mock,
  verify,
  when,
} from "@typestrong/ts-mockito";
import StatusService from "../../src/model/service/StatusService";
import { AuthToken } from "tweeter-shared";

const FAKE_AUTHTOKEN = "qwerasdfzxcv";

describe("PostStatusPresenter", () => {
  let mockPostStatusView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;
  const authToken = new AuthToken(FAKE_AUTHTOKEN, Date.now());

  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    mockStatusService = mock<StatusService>();
    postStatusPresenter = new PostStatusPresenter(
      instance(mockPostStatusView),
      instance(mockStatusService),
    );
  });

  it("should tell the view to display a posting status message.", () => {
    postStatusPresenter.submitPost();
    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", 0),
    ).once();
  });

  it("should call postStatus on the post status service with the correct status string and auth token.", async () => {
    const expectedPost = "my post";
    when(mockStatusService.postStatus(anything(), anything())).thenResolve();
    when(mockPostStatusView.post).thenReturn(expectedPost);
    when(mockPostStatusView.authToken).thenReturn(authToken);

    await postStatusPresenter.submitPost();

    verify(mockStatusService.postStatus(anything(), anything())).once();
    let [token, status] = capture(mockStatusService.postStatus).last();

    expect(token.token).toEqual(authToken.token);
    expect(status.post).toEqual(expectedPost);
  });
});
