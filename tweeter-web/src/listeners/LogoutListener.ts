import { AuthToken } from "tweeter-shared";

export default interface LogoutListener {
  authToken: AuthToken | null;
  clearUserInfo: () => void;
  displayInfoMessage: (
    message: string,
    duration: number,
    bootstrapClasses?: string | undefined,
  ) => void;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined,
  ) => void;
  clearLastInfoMessage: () => void;
}
