import { AuthToken } from "tweeter-shared";
import { MessageView } from "./super/MessageView";

export default interface LogoutView extends MessageView {
  authToken: AuthToken | null;
  clearUserInfo: () => void;
}
