import UserInfoView from "../listeners/UserInfoView";
import { FollowService } from "../model/service/FollowService";
import { AuthToken, User } from "tweeter-shared";
import React from "react";
import { Presenter } from "./Presenter";

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
    try {
      this.view.setFollowerCount(
        await this.service.getFollowerCount(authToken, displayedUser),
      );
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followers count because of exception: ${error}`,
      );
    }
  };

  public setNumbFollowees = async (
    authToken: AuthToken,
    displayedUser: User,
  ) => {
    try {
      this.view.setFolloweeCount(
        await this.service.getFolloweeCount(authToken, displayedUser),
      );
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get followees count because of exception: ${error}`,
      );
    }
  };

  public followDisplayedUser = async (
    event: React.MouseEvent,
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    event.preventDefault();

    try {
      this.view.setIsLoading(true);
      this.view.displayInfoMessage(`Following ${displayedUser!.name}...`, 0);

      const [followerCount, followeeCount] = await this.service.follow(
        authToken,
        displayedUser,
      );

      this.view.setIsFollower(true);
      this.view.setFollowerCount(followerCount);
      this.view.setFolloweeCount(followeeCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to follow user because of exception: ${error}`,
      );
    } finally {
      this.view.clearLastInfoMessage();
      this.view.setIsLoading(false);
    }
  };

  public unfollowDisplayedUser = async (
    event: React.MouseEvent,
    displayedUser: User,
    authToken: AuthToken,
  ): Promise<void> => {
    event.preventDefault();

    try {
      this.view.setIsLoading(true);
      this.view.displayInfoMessage(`Unfollowing ${displayedUser!.name}...`, 0);

      const [followerCount, followeeCount] = await this.service.unfollow(
        authToken,
        displayedUser,
      );

      this.view.setIsFollower(false);
      this.view.setFollowerCount(followerCount);
      this.view.setFolloweeCount(followeeCount);
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to unfollow user because of exception: ${error}`,
      );
    } finally {
      this.view.clearLastInfoMessage();
      this.view.setIsLoading(false);
    }
  };

  public setIsFollowerStatus = async (
    authToken: AuthToken,
    currentUser: User,
    displayedUser: User,
  ) => {
    try {
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
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to determine follower status because of exception: ${error}`,
      );
    }
  };

  public switchToLoggedInUser = (
    event: React.MouseEvent,
    currentUser: User,
  ): void => {
    event.preventDefault();
    this.view.setDisplayedUser(currentUser!);
  };
}
