import UserInfoView from "../listeners/UserInfoView";
import { AuthToken, User } from "tweeter-shared";
import React from "react";
import { Presenter } from "./super/Presenter";
import { FollowService } from "../model/service/FollowService";

export default class UserInfoPresenter extends Presenter<UserInfoView> {
  //Properties
  private service: FollowService;

  //Constructor
  public constructor(view: UserInfoView) {
    super(view);
    this.service = new FollowService();
  }

  //Methods
  public setNumbFollowers = async (
    authToken: AuthToken,
    displayedUser: User,
  ) => {
    await this.doFailureReportingOperation(async () => {
      this.view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser),
      );
    }, "followers count");
  };

  public setNumbFollowees = async (
    authToken: AuthToken,
    displayedUser: User,
  ) => {
    await this.doFailureReportingOperation(async () => {
      this.view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser),
      );
    }, "get followees count");
  };

  public followDisplayedUser = async (
    event: React.MouseEvent,
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    event.preventDefault();

    await this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);
        this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

        const [followerCount, followeeCount] = await this.service.follow(
          authToken,
          displayedUser,
        );

        this.view.setIsFollower(true);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      },
      "follow user",
      () => {
        this.view.clearLastInfoMessage();
        this.view.setIsLoading(false);
      },
    );
  };

  public unfollowDisplayedUser = async (
    event: React.MouseEvent,
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    event.preventDefault();

    await this.doFailureReportingOperation(
      async () => {
        this.view.setIsLoading(true);
        this.view.displayInfoMessage(
          `Unfollowing ${displayedUser!.name}...`,
          0,
        );

        const [followerCount, followeeCount] = await this.service.unfollow(
          authToken,
          displayedUser,
        );

        this.view.setIsFollower(false);
        this.view.setFollowerCount(followerCount);
        this.view.setFolloweeCount(followeeCount);
      },
      "unfollow user",
      () => {
        this.view.clearLastInfoMessage();
        this.view.setIsLoading(false);
      },
    );
  };

  public setIsFollowerStatus = async (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) => {
    await this.doFailureReportingOperation(async () => {
      if (currentUser === displayedUser) {
        this.view.setIsFollower(false);
      } else {
        this.view.setIsFollower(
          await this.service.getIsFollowerStatus(
            authToken!,
            currentUser!,
            displayedUser!,
          ),
        );
      }
    }, "determine follower status");
  };

  public switchToLoggedInUser = (
    event: React.MouseEvent,
    currentUser: User,
  ): void => {
    event.preventDefault();
    this.view.setDisplayedUser(currentUser!);
  };
}
