import AppNavbarPresenter from "../../src/presenters/AppNavbarPresenter";
import AppNavbarPresenterView from "../../src/listeners/AppNavbarPresenterView";
import { instance, mock, verify } from "@typestrong/ts-mockito";
import { AuthToken } from "tweeter-shared";

const FAKE_AUTHTOKEN = "qwerasdfzxcv";

describe("AppNavbarPresenter", () => {
  let mockAppNavbarPresenterView: AppNavbarPresenterView;
  let appNavbarPresenter: AppNavbarPresenter;

  const authToken = new AuthToken(FAKE_AUTHTOKEN, Date.now());

  beforeEach(() => {
    mockAppNavbarPresenterView = mock<AppNavbarPresenterView>();
    const mockAppNavbarPresenterViewInstance = instance(
      mockAppNavbarPresenterView,
    );

    appNavbarPresenter = new AppNavbarPresenter(
      mockAppNavbarPresenterViewInstance,
    );
  });

  it("tells the view to display a logging out message", () => {
    appNavbarPresenter.logOut(authToken);
    verify(
      mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0),
    ).once();
  });
});
