import { AuthToken, User } from "tweeter-shared";
import React from "react";

export default interface UserInfoView {
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
  displayedUser: User | null;
  setDisplayedUser: (user: User) => void;
  setIsFollower: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setFolloweeCount: React.Dispatch<React.SetStateAction<number>>;
  setFollowerCount: React.Dispatch<React.SetStateAction<number>>;
}
