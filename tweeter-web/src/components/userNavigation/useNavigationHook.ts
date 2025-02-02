import { AuthToken, FakeData, User } from "tweeter-shared";
import React from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";

interface NavigationHandler {
  navigateToUser: (event: React.MouseEvent) => Promise<void>;
}

export default function useNavigationHook(): NavigationHandler {
  const { setDisplayedUser, currentUser, authToken } = useUserInfoListener();
  const { displayErrorMessage } = useToastListener();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const user = await getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          setDisplayedUser(currentUser!);
        } else {
          setDisplayedUser(user);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string,
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  return { navigateToUser };
}
