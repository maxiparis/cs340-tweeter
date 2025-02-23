import { AuthToken, User } from "tweeter-shared";
import React from "react";

export default interface PostStatusView {
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined,
  ) => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined,
  ) => void;
  clearLastInfoMessage: () => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}
