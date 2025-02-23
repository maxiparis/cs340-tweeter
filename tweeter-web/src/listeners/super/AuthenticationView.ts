import { View } from "./View";
import { NavigateFunction } from "react-router-dom";
import { AuthToken, User } from "tweeter-shared";
import React from "react";

export interface AuthenticationView extends View {
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
}
