import React from "react";

interface Props {
  onEnter: (event: React.KeyboardEvent<HTMLElement>) => void;
  setAlias: (alias: string) => void;
  setPassword: (password: string) => void;
}

export default function AuthenticationFields({
  onEnter,
  setAlias,
  setPassword,
}: Props) {
  return (
    <>
      <div className="AuthenticationFields form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          aria-label="alias"
          placeholder="name@example.com"
          onKeyDown={onEnter}
          onChange={(event) => setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className="AuthenticationFields form-floating">
        <input
          type="password"
          className="form-control"
          id="passwordInput"
          aria-label="password"
          placeholder="Password"
          onKeyDown={onEnter}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
}
