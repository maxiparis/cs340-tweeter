import { AuthToken, User } from "tweeter-shared";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import { View } from "./View";

export default interface LoginView extends View {
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
