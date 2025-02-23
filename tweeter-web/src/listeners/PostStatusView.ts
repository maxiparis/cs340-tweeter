import { AuthToken, User } from "tweeter-shared";
import React from "react";
import { View } from "./View";

export default interface PostStatusView extends View {
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
