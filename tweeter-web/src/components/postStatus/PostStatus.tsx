import "./PostStatus.css";
import { useState } from "react";
import useToastListener from "../toaster/ToastListenerHook";
import useUserInfoListener from "../userInfo/UserInfoListenerHook";
import PostStatusView from "../../listeners/PostStatusView";
import PostStatusPresenter from "../../presenters/PostStatusPresenter";

interface Props {
  presenter?: PostStatusPresenter;
}

const PostStatus = (props: Props) => {
  const { displayErrorMessage, displayInfoMessage, clearLastInfoMessage } =
    useToastListener();

  const { currentUser, authToken } = useUserInfoListener();
  const [post, setPost] = useState("");

  const listener: PostStatusView = {
    displayInfoMessage,
    displayErrorMessage,
    clearLastInfoMessage,
    authToken,
    currentUser,
    post,
    setPost,
  };
  const [presenter] = useState(
    props.presenter ?? new PostStatusPresenter(listener),
  );

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <div className={presenter.isLoading ? "loading" : ""}>
      <form>
        <div className="form-group mb-3">
          <textarea
            className="form-control"
            id="postStatusTextArea"
            aria-label="textField"
            rows={10}
            placeholder="What's on your mind?"
            value={post}
            onChange={(event) => {
              setPost(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <button
            id="postStatusButton"
            className="btn btn-md btn-primary me-1"
            type="button"
            aria-label="postStatusButton"
            disabled={checkButtonStatus()}
            style={{ width: "8em" }}
            onClick={(event) =>
              presenter.submitPost(post, currentUser, authToken, event)
            }
          >
            {presenter.isLoading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <div>Post Status</div>
            )}
          </button>
          <button
            id="clearStatusButton"
            className="btn btn-md btn-secondary"
            type="button"
            aria-label="clearButton"
            disabled={checkButtonStatus()}
            onClick={(event) => presenter.clearPost(event)}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostStatus;
