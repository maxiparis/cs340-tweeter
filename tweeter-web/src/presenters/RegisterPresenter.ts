import RegisterView from "../listeners/RegisterView";
import { Buffer } from "buffer";
import React, { ChangeEvent } from "react";
import AuthPresenter from "./super/AuthPresenter";

export default class RegisterPresenter extends AuthPresenter<RegisterView> {
  private imageBytes: Uint8Array;

  public constructor(view: RegisterView) {
    super(view);
    this.imageBytes = new Uint8Array();
  }

  public doRegister = async () => {
    await this.doAuth(
      // authOperation
      () => {
        return this.service.register(
          this.view.firstName,
          this.view.lastName,
          this.view.alias,
          this.view.password,
          this.imageBytes,
          this.view.imageFileExtension,
        );
      },
      // navigatePostAuth
      () => this.view.navigate("/"),
      // message
      "register user",
    );
  };

  public registerOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !this.view.checkSubmitButtonStatus()) {
      this.doRegister();
    }
  };

  public handleImageFile = (file: File | undefined) => {
    if (file) {
      this.view.setImageUrl(URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const imageStringBase64 = event.target?.result as string;

        // Remove unnecessary file metadata from the start of the string.
        const imageStringBase64BufferContents =
          imageStringBase64.split("base64,")[1];

        this.imageBytes = Buffer.from(
          imageStringBase64BufferContents,
          "base64",
        );
      };
      reader.readAsDataURL(file);

      // Set image file extension (and move to a separate method)
      const fileExtension = this.getFileExtension(file);
      if (fileExtension) {
        this.view.setImageFileExtension(fileExtension);
      }
    } else {
      this.view.setImageUrl("");
      this.imageBytes = new Uint8Array();
    }
  };

  public handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    this.handleImageFile(file);
  };

  public getFileExtension = (file: File): string | undefined => {
    return file.name.split(".").pop();
  };
}
