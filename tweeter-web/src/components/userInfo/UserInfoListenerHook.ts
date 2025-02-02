import useInfoContext from "./UserInfoHook";
import { AuthToken, User } from "tweeter-shared";

interface UserInfoListener {
  currentUser: User | null;
  authToken: AuthToken | null;
  displayedUser: User | null;
  setDisplayedUser: (user: User) => void;
  clearUserInfo: () => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean,
  ) => void;
}

const useUserInfoListener = (): UserInfoListener => {
  const {
    currentUser,
    authToken,
    displayedUser,
    setDisplayedUser,
    clearUserInfo,
    updateUserInfo,
  } = useInfoContext();

  return {
    currentUser: currentUser,
    authToken: authToken,
    displayedUser: displayedUser,
    setDisplayedUser: setDisplayedUser,
    clearUserInfo: clearUserInfo,
    updateUserInfo: updateUserInfo,
  };
};

export default useUserInfoListener;
