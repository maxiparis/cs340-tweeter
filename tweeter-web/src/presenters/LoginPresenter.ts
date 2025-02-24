import LoginView from "../listeners/LoginView";
import { UserService } from "../model/service/UserService";
import { Presenter } from "./super/Presenter";

export default class LoginPresenter extends Presenter<LoginView> {
  //Properties
  private service: UserService;

  //Constructor
  constructor(view: LoginView) {
    super(view);
    this.service = new UserService();
  }

  //Methods
  public doLogin = async () => {
    await this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.service.login(
          this.view.alias,
          this.view.password,
        );

        this.view.updateUserInfo(user, user, authToken, this.view.rememberMe);

        if (!!this.view.originalUrl) {
          this.view.navigate(this.view.originalUrl);
        } else {
          this.view.navigate("/");
        }
      },
      "log user in",
      () => {
        this.view.setIsLoading(false);
      },
    );
  };

  public loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !this.view.checkSubmitButtonStatus()) {
      this.doLogin();
    }
  };
}
