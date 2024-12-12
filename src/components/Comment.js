import { useEffect, useState } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";

function Comment({ id, showComments }) {
  const [comments, setComments] = useState([]);
  const [updateId, setUpdateID] = useState(false);
  const [isShow, setIsShow] = useState(showComments);

  const getUser = (userId) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
      const decodedJWT = JSON.parse(
        decodeURIComponent(
          window
            .atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        )
      );

      if (decodedJWT.user_id === userId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getComment = async () => {
    const commentsList = await publicAPI.get(`posts/${id}/comments/`);
    const data = commentsList.data;
    setComments(data);
    // console.log(commentsList);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let commentInput = event.target.form;
    privateAPI
      .post(`posts/${id}/comment/`, {
        content: commentInput["input-comment"].value,
      })
      .then((response) => {
        commentInput.reset();
        setIsShow(true);
        getComment();
      })
      .catch((error) => console.log(error.response));
  };

  const shwoComment = () => {
    setIsShow((cur) => !cur);
  };

  const deleteComment = async (commentId, e) => {
    await privateAPI
      .post(`posts/comment/${commentId}/delete/`)
      .then((response) => {
        console.log(response);
        getComment();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  const updateComment = async (commentID, e) => {
    if (updateId === commentID) {
      setUpdateID(false);
    } else {
      setUpdateID(commentID);
    }
  };

  const sendUpdateComment = async (e, commentID) => {
    e.preventDefault();
    console.log(e);
    await privateAPI
      .post(`posts/comment/${commentID}/`, {
        content: document.getElementById("update-comment").value,
      })
      .then((response) => {
        console.log(response.data);
        setUpdateID(false);
        getComment();
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      <span onClick={shwoComment} style={{ cursor: "pointer" }}>
        {" "}
        💬{" "}
      </span>{" "}
      <span>{comments.length}</span>
      <form id="comment-form" onSubmit={onSubmit}>
        <label htmlFor="input-comment">댓글 : </label>
        <input
          id="input-comment"
          name="input-comment"
          palceholder="댓글..."
          style={{ width: "60%" }}
        />
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={onSubmit}
        >
          ⬆️
        </button>
      </form>
      {isShow ? (
        comments.length === 0 ? (
          <p>댓글이 없습니다 💭</p>
        ) : (
          <div style={{ height: "350px", overflowY: "scroll" }}>
            {comments.map((comment) => (
              <div key={comment.id}>
                <strong>{comment.author.nickname}</strong>{" "}
                {updateId === comment.id ? (
                  <div>
                    <form>
                      <input
                        id="update-comment"
                        defaultValue={comment.content}
                        style={{ width: "60%" }}
                      />
                      <button onClick={(e) => sendUpdateComment(e, comment.id)}>
                        수정완료
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    <span>{comment.content}</span>{" "}
                  </div>
                )}
                <span
                  style={{
                    color: "gray",
                    fontSize: "10px",
                  }}
                >
                  {comment.created_at.slice(0, 10)}
                </span>
                {getUser(comment.author.id) ? (
                  <div>
                    <span
                      onClick={(e) => {
                        deleteComment(comment.id, e);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      [삭제]
                    </span>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        updateComment(comment.id, e);
                      }}
                    >
                      [수정]
                    </span>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}

export default Comment;
