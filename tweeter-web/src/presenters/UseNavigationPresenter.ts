import React from "react";
import { UserService } from "../model/service/UserService";
import UserNavigationView from "../listeners/UserNavigationView";
import { Presenter } from "./super/Presenter";

export default class UseNavigationPresenter extends Presenter<UserNavigationView> {
  // Properties
  private service: UserService;

  // Constructor
  public constructor(view: UserNavigationView) {
    super(view);
    this.service = new UserService();
  }

  // Methods
  public navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    await this.doFailureReportingOperation(async () => {
      const alias = this.extractAlias(event.target.toString());
      const user = await this.service.getUser(this.view.authToken!, alias);

      if (!!user) {
        if (this.view.currentUser!.equals(user)) {
          this.view.setDisplayedUser(this.view.currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    }, "get user");
  };

  private extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };
}
