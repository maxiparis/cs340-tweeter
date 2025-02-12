import { UserService } from "../model/service/UserService";
import LogoutListener from "../listeners/LogoutListener";

export default class LogoutPresenter {
  // Properties
  private listener: LogoutListener;
  private service: UserService;

  // Constructor
  constructor(listener: LogoutListener) {
    this.listener = listener;
    this.service = new UserService();
  }

  // Methods
  public logOut = async () => {
    this.listener.displayInfoMessage("Logging Out...", 0);

    try {
      await this.service.logout(this.listener.authToken!);

      this.listener.clearLastInfoMessage();
      this.listener.clearUserInfo();
    } catch (error) {
      this.listener.displayErrorMessage(
        `Failed to log user out because of exception: ${error}`,
      );
    }
  };
}
