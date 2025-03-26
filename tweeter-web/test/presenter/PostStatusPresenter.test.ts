import PostStatusPresenter from "../../src/presenters/PostStatusPresenter";
import PostStatusView from "../../src/listeners/PostStatusView";
import {
  anyString,
  anything,
  capture,
  instance,
  mock,
  verify,
  when,
} from "@typestrong/ts-mockito";
import StatusService from "../../src/model/service/StatusService";
import { AuthToken, User } from "tweeter-shared";

const FAKE_AUTHTOKEN = "qwerasdfzxcv";

describe("PostStatusPresenter", () => {
  let mockPostStatusView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockStatusService: StatusService;
  const authToken = new AuthToken(FAKE_AUTHTOKEN, Date.now());
  let mockUser: User;
  let mockAuthToken: AuthToken;

  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    mockStatusService = mock<StatusService>();

    mockUser = mock<User>();
    mockAuthToken = mock<AuthToken>();

    when(mockUser.firstName).thenReturn("first");
    when(mockUser.lastName).thenReturn("last");
    when(mockUser.alias).thenReturn("alias");
    when(mockUser.imageUrl).thenReturn("imageURL");

    when(mockAuthToken.token).thenReturn(FAKE_AUTHTOKEN);
    when(mockAuthToken.timestamp).thenReturn(Date.now());

    postStatusPresenter = new PostStatusPresenter(
      instance(mockPostStatusView),
      instance(mockStatusService),
    );
  });

  it("should tell the view to display a posting status message.", () => {
    postStatusPresenter.submitPost(
      anything(),
      instance(mockUser),
      instance(mockAuthToken),
    );
    verify(
      mockPostStatusView.displayInfoMessage("Posting status...", 0),
    ).once();
  });

  it("should call postStatus on the post status service with the correct status string and auth token.", async () => {
    const expectedPost = "my post";
    when(mockStatusService.postStatus(anything(), anything())).thenResolve();
    when(mockPostStatusView.post).thenReturn(expectedPost);
    when(mockPostStatusView.authToken).thenReturn(authToken);

    await postStatusPresenter.submitPost(
      expectedPost,
      instance(mockUser),
      instance(mockAuthToken),
    );

    verify(mockStatusService.postStatus(anything(), anything())).once();
    let [token, status] = capture(mockStatusService.postStatus).last();

    expect(token.token).toEqual(authToken.token);
    expect(status.post).toEqual(expectedPost);
  });

  it("when posting successful, should tell the view to clear the last info message, clear the post, and display a status posted message.", async () => {
    const expectedPost = "my post";
    when(mockStatusService.postStatus(anything(), anything())).thenResolve();
    when(mockPostStatusView.post).thenReturn(expectedPost);
    when(mockPostStatusView.authToken).thenReturn(authToken);

    await postStatusPresenter.submitPost(
      expectedPost,
      instance(mockUser),
      instance(mockAuthToken),
    );

    verify(mockStatusService.postStatus(anything(), anything())).once();
    verify(mockPostStatusView.setPost("")).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000),
    ).once();
    verify(mockPostStatusView.clearLastInfoMessage()).once();
  });

  it("when posting is not successful, should call displayError, clearLastInfoMessage, and should not clear post, or display posted message", async () => {
    when(mockStatusService.postStatus(anything(), anything())).thenThrow(
      Error("Something unexpected happened"),
    );
    await postStatusPresenter.submitPost(
      anyString(),
      instance(mockUser),
      instance(mockAuthToken),
    );

    verify(mockPostStatusView.displayErrorMessage(anything())).once();
    verify(mockPostStatusView.clearLastInfoMessage()).once();

    verify(mockPostStatusView.setPost(anything())).never();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000),
    ).never();
  });
});
