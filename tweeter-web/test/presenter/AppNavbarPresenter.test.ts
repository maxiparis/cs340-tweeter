import AppNavbarPresenter from "../../src/presenters/AppNavbarPresenter";
import AppNavbarPresenterView from "../../src/listeners/AppNavbarPresenterView";
import {
  anything,
  capture,
  instance,
  mock,
  verify,
  when,
} from "@typestrong/ts-mockito";
import { AuthToken } from "tweeter-shared";
import { UserService } from "../../src/model/service/UserService";

const FAKE_AUTHTOKEN = "qwerasdfzxcv";

describe("AppNavbarPresenter", () => {
  let mockAppNavbarPresenterView: AppNavbarPresenterView;
  let appNavbarPresenter: AppNavbarPresenter;
  let mockUserService: UserService;
  const authToken = new AuthToken(FAKE_AUTHTOKEN, Date.now());

  beforeEach(() => {
    mockAppNavbarPresenterView = mock<AppNavbarPresenterView>();
    mockUserService = mock<UserService>(); // Correctly mock UserService

    appNavbarPresenter = new AppNavbarPresenter(
      instance(mockAppNavbarPresenterView),
      instance(mockUserService),
    );
  });

  /** ---------------------------------- **/
  /** ✅When logout successful **/

  it("tells the view to display a logging out message", () => {
    appNavbarPresenter.logOut(authToken);
    verify(
      mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0),
    ).once();
  });

  it("calls logout with correct authToken", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockUserService.logout(authToken)).once();

    let [capturedAuthToken] = capture(mockUserService.logout).last();
    expect(capturedAuthToken).toEqual(authToken);
  });

  it("the presenter tells the view to clear the last info message and clear the user info.", async () => {
    await appNavbarPresenter.logOut(authToken);

    verify(mockAppNavbarPresenterView.clearLastInfoMessage()).once();
    verify(mockAppNavbarPresenterView.clearUserInfo()).once();

    verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();
  });

  /** ---------------------------------- **/
  /** ⚠️When logout not successful **/

  it("the presenter tells the view to display an error message and does not tell it to clear the last info message or clear the user info.", async () => {
    const error = new Error("An error occurred");
    when(mockUserService.logout(authToken)).thenThrow(error);

    await appNavbarPresenter.logOut(authToken);

    //display an error message
    // verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).once();
    verify(
      mockAppNavbarPresenterView.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      ),
    ).once();

    // does not tell it to clear the last info message or clear the user info
    verify(mockAppNavbarPresenterView.clearLastInfoMessage()).never();
    verify(mockAppNavbarPresenterView.clearUserInfo()).never();
  });
});
