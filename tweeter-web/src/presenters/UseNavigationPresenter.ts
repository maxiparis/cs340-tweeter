import React from "react";
import { UserService } from "../model/service/UserService";
import UseNavigationListener from "../listeners/UseNavigationListener";

export default class UseNavigationPresenter {
  // Properties
  private listener: UseNavigationListener;
  private service: UserService;

  // Constructor
  public constructor(listener: UseNavigationListener) {
    this.listener = listener;
    this.service = new UserService();
  }

  // Methods
  public navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = this.extractAlias(event.target.toString());
      const user = await this.service.getUser(this.listener.authToken!, alias);

      if (!!user) {
        if (this.listener.currentUser!.equals(user)) {
          this.listener.setDisplayedUser(this.listener.currentUser!);
        } else {
          this.listener.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this.listener.displayErrorMessage(
        `Failed to get user because of exception: ${error}`,
      );
    }
  };

  private extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };
}
