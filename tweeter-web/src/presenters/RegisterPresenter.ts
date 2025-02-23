import { UserService } from "../model/service/UserService";
import RegisterView from "../listeners/RegisterView";
import { Buffer } from "buffer";
import React, { ChangeEvent } from "react";
import { Presenter } from "./Presenter";

export default class RegisterPresenter extends Presenter<RegisterView> {
  private service: UserService;
  private imageBytes: Uint8Array;

  public constructor(view: RegisterView) {
    super(view);
    this.service = new UserService();
    this.imageBytes = new Uint8Array();
  }

  public doRegister = async () => {
    await this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);

        const [user, authToken] = await this.service.register(
          this.view.firstName,
          this.view.lastName,
          this.view.alias,
          this.view.password,
          this.imageBytes,
          this.view.imageFileExtension,
        );

        this.view.updateUserInfo(user, user, authToken, this.view.rememberMe);
        this.view.navigate("/");
      },
      "register user",
      () => {
        this.view.setIsLoading(false);
      },
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
