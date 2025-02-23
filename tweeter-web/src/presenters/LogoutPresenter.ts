import { UserService } from "../model/service/UserService";
import LogoutView from "../listeners/LogoutView";
import { Presenter } from "./Presenter";

export default class LogoutPresenter extends Presenter<LogoutView> {
  // Properties
  private service: UserService;

  // Constructor
  constructor(view: LogoutView) {
    super(view);
    this.service = new UserService();
  }

  // Methods
  public logOut = async () => {
    this.view.displayInfoMessage("Logging Out...", 0);

    await this.doFailureReportingOperation(async () => {
      await this.service.logout(this.view.authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, "log user out");
  };
}
