import React from "react";
import { AuthenticationView } from "./super/AuthenticationView";

export default interface RegisterView extends AuthenticationView {
  firstName: string;
  lastName: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageFileExtension: string;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}
