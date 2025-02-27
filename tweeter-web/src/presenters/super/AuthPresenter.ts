import { Presenter } from "./Presenter";
import { UserService } from "../../model/service/UserService";
import { AuthenticationView } from "../../listeners/super/AuthenticationView";
import { AuthToken, User } from "tweeter-shared";

export default class AuthPresenter<
  ViewType extends AuthenticationView,
> extends Presenter<ViewType> {
  private _service: UserService;

  constructor(view: ViewType) {
    super(view);
    this._service = new UserService();
  }

  get service(): UserService {
    return this._service;
  }

  public async doAuth(
    authOperation: () => Promise<[User, AuthToken]>,
    navigatePostAuth: () => void,
    errorDescription: string,
  ) {
    await this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await authOperation();

        this.view.updateUserInfo(user, user, authToken, this.view.rememberMe);
        navigatePostAuth();
      },
      errorDescription,
      () => {
        this.view.setIsLoading(false);
      },
    );
  }
}
