import LoginView from "../listeners/LoginView";
import AuthPresenter from "./super/AuthPresenter";
import React from "react";

export default class LoginPresenter extends AuthPresenter<LoginView> {
  //Methods
  public doLogin = async (
    alias: string,
    password: string,
    originalUrl: string,
  ) => {
    await this.doAuth(
      // authOperation
      () => {
        return this.service.login(alias, password);
      },
      // navigatePostAuth
      () => {
        if (!!originalUrl) {
          this.view.navigate(originalUrl);
        } else {
          this.view.navigate("/");
        }
      },
      // message
      "log user in",
    );
  };
}
