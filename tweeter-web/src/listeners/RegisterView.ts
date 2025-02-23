import React from "react";
import { View } from "./super/View";

export default interface RegisterView extends View {
  firstName: string;
  lastName: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  imageFileExtension: string;
  setImageFileExtension: React.Dispatch<React.SetStateAction<string>>;
}
