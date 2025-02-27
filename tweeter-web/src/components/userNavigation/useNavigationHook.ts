import React, { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";
import UserNavigationView from "../../listeners/UserNavigationView";
import UseNavigationPresenter from "../../presenters/UseNavigationPresenter";

interface NavigationHandler {
  navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

export default function useNavigationHook(): NavigationHandler {
  const { setDisplayedUser, currentUser, authToken } = useUserInfoListener();
  const { displayErrorMessage } = useToastListener();

  //MVP
  const listener: UserNavigationView = {
    setDisplayedUser,
    currentUser,
    authToken,
    displayErrorMessage,
  };
  const [presenter] = useState(new UseNavigationPresenter(listener));

  return { navigateToUser: presenter.navigateToUser };
}
