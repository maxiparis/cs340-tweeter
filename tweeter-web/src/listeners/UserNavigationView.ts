import { AuthToken, User } from "tweeter-shared";
import { View } from "./View";

export default interface UserNavigationView extends View {
  setDisplayedUser: (user: User) => void;
  currentUser: User | null;
  authToken: AuthToken | null;
}
