import { User } from "tweeter-shared";
import React from "react";
import { MessageView } from "./super/MessageView";

export default interface UserInfoView extends MessageView {
  setDisplayedUser: (user: User) => void;
  setIsFollower: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFolloweeCount: React.Dispatch<React.SetStateAction<number>>;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}
