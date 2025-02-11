import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useToastListener from "../toaster/ToastListenerHook";

interface Props {
  providerNameLowercase:
    | "google"
    | "facebook"
    | "twitter"
    | "linkedin"
    | "github";
}

export default function OAuthButton({ providerNameLowercase }: Props) {
  const { displayInfoMessage } = useToastListener();
  const providerName = capitalizeFirstLetter(providerNameLowercase);
  const displayInfoMessageWithDarkBackground = (message: string): void => {
    displayInfoMessage(message, 3000, "text-white bg-primary");
  };

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // @ts-ignore
  return (
    <button
      type="button"
      className="OAuthButton btn btn-link btn-floating mx-1"
      onClick={() =>
        displayInfoMessageWithDarkBackground(
          `${providerName} registration is not implemented.`,
        )
      }
    >
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id={`${providerNameLowercase}tooltip`}>
            {providerName}
          </Tooltip>
        }
      >
        <FontAwesomeIcon icon={["fab", providerNameLowercase]} />
      </OverlayTrigger>
    </button>
  );
}
