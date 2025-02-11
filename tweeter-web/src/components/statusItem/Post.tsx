import { AuthToken, FakeData, Status, User, Type } from "tweeter-shared";
import { Link } from "react-router-dom";
import useNavigationHook from "../userNavigation/useNavigationHook";

interface Props {
  status: Status;
}

const Post = (props: Props) => {
  const { navigateToUser } = useNavigationHook();

  return (
    <div className="Post.tsx">
      {props.status.segments.map((segment, index) => {
        const key = `${segment.type}-${segment.text}-${index}`;

        return segment.type === Type.alias ? (
          <Link
            key={key}
            to={segment.text}
            onClick={(event) => navigateToUser(event)}
          >
            {segment.text}
          </Link>
        ) : segment.type === Type.url ? (
          <a
            key={key}
            href={segment.text}
            target="_blank"
            rel="noopener noreferrer"
          >
            {segment.text}
          </a>
        ) : segment.type === Type.newline ? (
          <br key={key} />
        ) : (
          <span key={key}>{segment.text}</span> // Wrap plain text with <span> for consistency
        );
      })}
    </div>
  );
};

export default Post;
