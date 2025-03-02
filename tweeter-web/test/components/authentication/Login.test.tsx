import Login from "../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import LoginPresenter from "../../../src/presenters/LoginPresenter";
import { instance, mock, verify } from "@typestrong/ts-mockito";

library.add(fab);

describe("Login Component", () => {
  it("should start with the sign-in button disabled", () => {
    const { signInButton } = renderLoginAndGetElement("/");
    expect(signInButton).toBeDisabled();
  });

  it("should enable sign-in buttons if alias and password are filled", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElement("/");
    await user.type(aliasField, "my name");
    await user.type(passwordField, "my pass");

    expect(signInButton).toBeEnabled();
  });

  it("should disable sign-in button if either alias or password fields are empty", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElement("/");

    await user.type(aliasField, "my name");
    expect(signInButton).toBeDisabled();

    await user.clear(aliasField);

    await user.type(passwordField, "my pass");
    expect(signInButton).toBeDisabled();

    await user.type(aliasField, "my name");
    expect(signInButton).toBeEnabled();
  });

  it("should call presenter login method with correct parameters when sign-in pressed", async () => {
    const presenter = mock<LoginPresenter>();
    const alias = "max";
    const pass = "mypass";
    const originalUrl = "http://someurl.com";

    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElement(originalUrl, instance(presenter));
    await user.type(aliasField, alias);
    await user.type(passwordField, pass);

    await user.click(signInButton);

    verify(presenter.doLogin(alias, pass, originalUrl)).once();
  });
});

const renderLogin = (originalUrl: string, presenter?: LoginPresenter) => {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter} />
      ) : (
        <Login originalUrl={originalUrl} />
      )}
    </MemoryRouter>,
  );
};

const renderLoginAndGetElement = (
  originalUrl: string,
  presenter?: LoginPresenter,
) => {
  const user = userEvent.setup();

  renderLogin(originalUrl, presenter);

  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");
  return { signInButton, aliasField, passwordField, user };
};
