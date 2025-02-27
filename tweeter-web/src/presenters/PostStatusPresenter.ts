import { Status } from "tweeter-shared";
import StatusService from "../model/service/StatusService";
import PostStatusView from "../listeners/PostStatusView";
import React from "react";
import { Simulate } from "react-dom/test-utils";
import { Presenter } from "./super/Presenter";

export default class PostStatusPresenter extends Presenter<PostStatusView> {
  //Properties
  private service: StatusService;
  private _isLoading = false;

  //Getters/Setters
  get isLoading(): boolean {
    return this._isLoading;
  }

  //Constructor
  public constructor(view: PostStatusView) {
    super(view);
    this.service = new StatusService();
  }

  //Methods
  public async submitPost(event: React.MouseEvent) {
    event.preventDefault();

    await this.doFailureReportingOperation(
      async () => {
        this._isLoading = true;
        this.view.displayInfoMessage("Posting status...", 0);

        const status = new Status(
          this.view.post,
          this.view.currentUser!,
          Date.now(),
        );

        await this.service.postStatus(this.view.authToken!, status);

        this.view.setPost("");
        this.view.displayInfoMessage("Status posted!", 2000);
      },
      "post the status",
      () => {
        this.view.clearLastInfoMessage();
        this._isLoading = false;
      },
    );
  }

  public clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    this.view.setPost("");
  };
}
