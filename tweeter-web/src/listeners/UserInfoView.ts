import { AuthToken, User } from "tweeter-shared";
import React from "react";
import { View } from "./View";

export default interface UserInfoView extends View {
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined,
  ) => void;
  clearLastInfoMessage: () => void;
  setDisplayedUser: (user: User) => void;
  setIsFollower: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFolloweeCount: React.Dispatch<React.SetStateAction<number>>;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}
