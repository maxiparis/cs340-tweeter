import React from "react";
import { UserService } from "../model/service/UserService";
import UserNavigationView from "../listeners/UserNavigationView";
import { Presenter } from "./Presenter";

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

    try {
      const alias = this.extractAlias(event.target.toString());
      const user = await this.service.getUser(this.view.authToken!, alias);

      if (!!user) {
        if (this.view.currentUser!.equals(user)) {
          this.view.setDisplayedUser(this.view.currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
  };

  private extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };
}
