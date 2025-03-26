import { MessageView } from "./super/MessageView";

export default interface AppNavbarPresenterView extends MessageView {
  clearUserInfo: () => void;
}
