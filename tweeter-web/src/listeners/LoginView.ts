import { AuthenticationView } from "./super/AuthenticationView";

export default interface LoginView extends AuthenticationView {
  originalUrl?: string;
}
