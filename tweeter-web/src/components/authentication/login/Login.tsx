import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfoListener from "../../userInfo/UserInfoListenerHook";
import LoginView from "../../../listeners/LoginView";
import LoginPresenter from "../../../presenters/LoginPresenter";

interface Props {
  originalUrl?: string;
  presenter?: LoginPresenter;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfoListener();
  const { displayErrorMessage } = useToastListener();
  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  // MVP
  const listener: LoginView = {
    displayErrorMessage,
    setIsLoading,
    updateUserInfo,
    checkSubmitButtonStatus,
    navigate,
    alias,
    password,
    rememberMe,
    originalUrl: props.originalUrl,
  };
  const [presenter] = useState(props.presenter ?? new LoginPresenter(listener));

  const loginOnEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key == "Enter" && !checkSubmitButtonStatus()) {
      presenter.doLogin(alias, password, props.originalUrl!);
    }
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={() => (
        <>
          <AuthenticationFields
            onEnter={loginOnEnter}
            setAlias={setAlias}
            setPassword={setPassword}
          />
          <img src="" className="img-thumbnail my-3" alt=""></img>
        </>
      )}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      isLoading={isLoading}
      submit={() => {
        presenter.doLogin(alias, password, props.originalUrl!);
      }}
    />
  );
};

export default Login;
