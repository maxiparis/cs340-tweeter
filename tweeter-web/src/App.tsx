import "./App.css";

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/login/Login";
import Register from "./components/authentication/register/Register";
import MainLayout from "./components/mainLayout/MainLayout";
import Toaster from "./components/toaster/Toaster";
import UserItemScroller from "./components/mainLayout/UserItemScroller";
import StatusItemScroller from "./components/mainLayout/StatusItemScroller";
import useUserInfoListener from "./components/userInfo/UserInfoListenerHook";
import { FolloweePresenter } from "./presenters/user-item/FolloweePresenter";
import { FollowerPresenter } from "./presenters/user-item/FollowerPresenter";
import FeedPresenter from "./presenters/status-item/FeedPresenter";
import StoryPresenter from "./presenters/status-item/StoryPresenter";
import { AddItemsView } from "./listeners/super/AddItemsView";
import { Status, User } from "tweeter-shared";

const App = () => {
  const { currentUser, authToken } = useUserInfoListener();

  const isAuthenticated = (): boolean => {
    return !!currentUser && !!authToken;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <BrowserRouter>
        {isAuthenticated() ? (
          <AuthenticatedRoutes />
        ) : (
          <UnauthenticatedRoutes />
        )}
      </BrowserRouter>
    </div>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/feed" />} />
        <Route
          path="feed"
          element={
            <StatusItemScroller
              presenterGenerator={(view: AddItemsView<Status>) =>
                new FeedPresenter(view)
              }
            />
          }
        />
        <Route
          path="story"
          element={
            <StatusItemScroller
              presenterGenerator={(view: AddItemsView<Status>) =>
                new StoryPresenter(view)
              }
            />
          }
        />
        <Route
          path="followees"
          element={
            <UserItemScroller
              presenterGenerator={(view: AddItemsView<User>) =>
                new FolloweePresenter(view)
              }
            />
          }
        />
        <Route
          path="followers"
          element={
            <UserItemScroller
              presenterGenerator={(view: AddItemsView<User>) =>
                new FollowerPresenter(view)
              }
            />
          }
        />
        <Route path="logout" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/feed" />} />
      </Route>
    </Routes>
  );
};

const UnauthenticatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Login originalUrl={location.pathname} />} />
    </Routes>
  );
};

export default App;
