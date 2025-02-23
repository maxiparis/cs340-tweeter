import { AuthToken, User } from "tweeter-shared";
import { NavigateFunction } from "react-router-dom";
import React from "react";
import { View } from "./View";

export default interface RegisterView extends View {
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
  firstName: string;
  lastName: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageFileExtension: string;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}
