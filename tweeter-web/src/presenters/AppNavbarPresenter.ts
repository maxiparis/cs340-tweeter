import { UserService } from "../model/service/UserService";
import AppNavbarPresenterView from "../listeners/AppNavbarPresenterView";
import { Presenter } from "./super/Presenter";
import { AuthToken } from "tweeter-shared";

export default class AppNavbarPresenter extends Presenter<AppNavbarPresenterView> {
  // Properties
  private service: UserService;

  // Constructor
  constructor(view: AppNavbarPresenterView) {
    super(view);
    this.service = new UserService();
  }

  // Methods
  public logOut = async (authToken: AuthToken | null) => {
    this.view.displayInfoMessage("Logging Out...", 0);

    await this.doFailureReportingOperation(async () => {
      await this.service.logout(authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, "log user out");
  };
}
