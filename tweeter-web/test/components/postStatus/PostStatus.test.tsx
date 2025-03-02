import PostStatus from "../../../src/components/postStatus/PostStatus";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostStatusPresenter from "../../../src/presenters/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";
import { anything, instance, mock, verify, when } from "@typestrong/ts-mockito";
import useInfoContext from "../../../src/components/userInfo/UserInfoHook";

jest.mock("../../../src/components/userInfo/UserInfoHook", () => ({
  ...jest.requireActual("../../../src/components/userInfo/UserInfoHook"),
  __esModule: true,
  default: jest.fn(),
}));

describe("PostStatus", () => {
  let presenterMock: PostStatusPresenter;
  let mockUser: User;
  let mockAuthToken: AuthToken;

  beforeAll(() => {
    mockUser = mock<User>();
    mockAuthToken = mock<AuthToken>();

    when(mockUser.firstName).thenReturn("first");
    when(mockUser.lastName).thenReturn("last");
    when(mockUser.alias).thenReturn("alias");
    when(mockUser.imageUrl).thenReturn("imageURL");

    when(mockAuthToken.token).thenReturn("crazy-token");
    when(mockAuthToken.timestamp).thenReturn(Date.now());

    (useInfoContext as jest.Mock).mockReturnValue({
      currentUser: instance(mockUser),
      authToken: instance(mockAuthToken),
    });
  });

  it("should have Post Status and Clear buttons disabled when first rendered", () => {
    const { postStatusButton, clearButton } = renderButtons();

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  it("should enable both buttons when textField has text", async () => {
    const { postStatusButton, clearButton, textField, user } = renderButtons();

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();

    await user.type(textField, "my new status");

    expect(textField.innerHTML).toEqual("my new status");

    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();
  });

  it("should disable buttons when text field is cleared", async () => {
    const { postStatusButton, clearButton, textField, user } = renderButtons();

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();

    await user.type(textField, "my new status");

    expect(textField.innerHTML).toEqual("my new status");

    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();

    await user.clear(textField);

    expect(postStatusButton).toBeDisabled();
    expect(clearButton).toBeDisabled();
  });

  // The presenter's postStatus method is called with correct parameters when the Post Status button is pressed.
  it("should call presenter postStatus method with correct parameters when Post Status button is pressed", async () => {
    const presenter = mock<PostStatusPresenter>();
    const { postStatusButton, clearButton, textField, user } = renderButtons(
      instance(presenter),
    );

    const post = "my new status";
    await user.type(textField, post);

    expect(textField.innerHTML).toEqual(post);

    expect(postStatusButton).toBeEnabled();
    expect(clearButton).toBeEnabled();

    await user.click(postStatusButton);

    verify(
      presenter.submitPost(
        post,
        instance(mockUser),
        instance(mockAuthToken),
        anything(),
      ),
    ).once();
  });
});

const renderPostStatus = (presenter?: PostStatusPresenter) => {
  return render(
    <>{!!presenter ? <PostStatus presenter={presenter} /> : <PostStatus />}</>,
  );
};

const renderButtons = (presenter?: PostStatusPresenter) => {
  const user = userEvent.setup();

  renderPostStatus(presenter);

  const postStatusButton = screen.getByLabelText("postStatusButton");
  const clearButton = screen.getByLabelText("clearButton");
  const textField = screen.getByLabelText("textField");

  return { postStatusButton, clearButton, textField, user };
};
