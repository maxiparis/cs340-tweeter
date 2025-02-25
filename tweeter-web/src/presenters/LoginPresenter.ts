import LoginView from "../listeners/LoginView";
import AuthPresenter from "./super/AuthPresenter";
import React from "react";

export default class LoginPresenter extends AuthPresenter<LoginView> {
  //Methods
  public doLogin = async () => {
    await this.doAuth(
      // authOperation
      () => {
        return this.service.login(this.view.alias, this.view.password);
      },
      // navigatePostAuth
      () => {
        if (!!this.view.originalUrl) {
          this.view.navigate(this.view.originalUrl);
        } else {
          this.view.navigate("/");
        }
      },
      // message
      "log user in",
    );
  };

  public loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !this.view.checkSubmitButtonStatus()) {
      this.doLogin();
    }
  };
}
