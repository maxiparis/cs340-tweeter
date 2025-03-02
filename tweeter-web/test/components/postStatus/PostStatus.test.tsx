import PostStatus from "../../../src/components/postStatus/PostStatus";
import { userEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PostStatusPresenter from "../../../src/presenters/PostStatusPresenter";
import { AuthToken, User } from "tweeter-shared";
import { instance, mock, when } from "@typestrong/ts-mockito";
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
});

const renderPostStatus = () => {
  return render(<PostStatus />);
};

const renderButtons = () => {
  const user = userEvent.setup();

  renderPostStatus();

  const postStatusButton = screen.getByLabelText("postStatusButton");
  const clearButton = screen.getByLabelText("clearButton");
  const textField = screen.getByLabelText("textField");

  return { postStatusButton, clearButton, textField, user };
};
