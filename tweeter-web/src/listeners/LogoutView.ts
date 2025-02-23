import { AuthToken } from "tweeter-shared";
import { View } from "./View";

export default interface LogoutView extends View {
  authToken: AuthToken | null;
  clearUserInfo: () => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined,
  ) => void;
  clearLastInfoMessage: () => void;
}
