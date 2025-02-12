import { AuthToken, User } from "tweeter-shared";

export default interface UseNavigationListener {
  setDisplayedUser: (user: User) => void;
  currentUser: User | null;
  authToken: AuthToken | null;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined,
  ) => void;
}
