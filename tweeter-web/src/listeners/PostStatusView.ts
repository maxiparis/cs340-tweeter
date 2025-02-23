import { AuthToken, User } from "tweeter-shared";
import React from "react";
import { MessageView } from "./super/MessageView";

export default interface PostStatusView extends MessageView {
  currentUser: User | null;
  authToken: AuthToken | null;
  post: string;
  setPost: React.Dispatch<React.SetStateAction<string>>;
}
