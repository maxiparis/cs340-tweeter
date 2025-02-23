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

    try {
      await this.service.logout(this.view.authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      );
    }
  };
}
