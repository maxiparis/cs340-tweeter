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
import useUserInfoListener from "./components/userInfo/UserInfoListenerHook";
import { FolloweePresenter } from "./presenters/user-item/FolloweePresenter";
import { FollowerPresenter } from "./presenters/user-item/FollowerPresenter";
import FeedPresenter from "./presenters/status-item/FeedPresenter";
import StoryPresenter from "./presenters/status-item/StoryPresenter";
import { AddItemsView } from "./listeners/super/AddItemsView";
import { Status, User } from "tweeter-shared";
import ItemScroller from "./components/mainLayout/ItemScroller";
import StatusItem from "./components/statusItem/StatusItem";
import UserItem from "./components/userItem/UserItem";

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
            <ItemScroller
              key={0}
              presenterGenerator={(view: AddItemsView<Status>) =>
                new FeedPresenter(view)
              }
              itemComponentGenerator={(item: Status) => (
                <StatusItem item={item} />
              )}
            />
          }
        />
        <Route
          path="story"
          element={
            <ItemScroller
              key={1}
              presenterGenerator={(view: AddItemsView<Status>) =>
                new StoryPresenter(view)
              }
              itemComponentGenerator={(item: Status) => (
                <StatusItem item={item} />
              )}
            />
          }
        />
        <Route
          path="followees"
          element={
            <ItemScroller
              key={2}
              presenterGenerator={(view: AddItemsView<User>) =>
                new FolloweePresenter(view)
              }
              itemComponentGenerator={(item: User) => (
                <div className="row mb-3 mx-0 px-0 border rounded bg-white">
                  <UserItem value={item} />
                </div>
              )}
            />
          }
        />
        <Route
          path="followers"
          element={
            <ItemScroller
              key={3}
              presenterGenerator={(view: AddItemsView<User>) =>
                new FollowerPresenter(view)
              }
              itemComponentGenerator={(item: User) => (
                <div className="row mb-3 mx-0 px-0 border rounded bg-white">
                  <UserItem value={item} />
                </div>
              )}
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
