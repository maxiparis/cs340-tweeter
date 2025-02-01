import OAuthButton from "./OAuthButton";

export default function OAuthList() {
  return (
    <>
      <div className="OAuthList text-center mb-3">
        <OAuthButton providerNameLowercase={"google"} />
        <OAuthButton providerNameLowercase={"facebook"} />
        <OAuthButton providerNameLowercase={"twitter"} />
        <OAuthButton providerNameLowercase={"linkedin"} />
        <OAuthButton providerNameLowercase={"github"} />
      </div>
    </>
  );
}
