import { AuthToken, User } from "tweeter-shared";
import { NavigateFunction } from "react-router-dom";
import React from "react";

export default interface LoginView {
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined,
  ) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean,
  ) => void;
  checkSubmitButtonStatus(): boolean;
  navigate: NavigateFunction;
  alias: string;
  password: string;
  rememberMe: boolean;
  originalUrl?: string;
}
