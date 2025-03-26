import { UserService } from "../model/service/UserService";
import AppNavbarPresenterView from "../listeners/AppNavbarPresenterView";
import { Presenter } from "./super/Presenter";
import { AuthToken } from "tweeter-shared";

export default class AppNavbarPresenter extends Presenter<AppNavbarPresenterView> {
  // Properties
  private _service: UserService;

  // Constructor
  constructor(
    view: AppNavbarPresenterView,
    service: UserService = new UserService(),
  ) {
    super(view);
    this._service = service;
  }

  public get service(): UserService {
    return this._service;
  }

  // Methods
  public logOut = async (authToken: AuthToken | null) => {
    this.view.displayInfoMessage("Logging Out...", 0);

    await this.doFailureReportingOperation(async () => {
      await this._service.logout(authToken!);

      this.view.clearLastInfoMessage();
      this.view.clearUserInfo();
    }, "log user out");
  };
}
