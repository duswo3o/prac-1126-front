import { useEffect, useState } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";

function Comment({ id, showComments }) {
  const [comments, setComments] = useState([]);
  const [updateId, setUpdateID] = useState(false);

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

      if (decodedJWT.user_id == userId) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getComment = async () => {
    const commentsList = await (
      await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/comments/`)
    ).json();
    setComments(commentsList);
    // console.log(commentsList);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    let commentInput = event.target.form;
    // console.log(commentInput);
    // fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/comment/`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8",
    //     Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //   },
    //   body: JSON.stringify({
    //     content: commentInput["input-comment"].value,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // console.log(result);
    //     commentInput.reset();
    //     getComment();
    //   });
    privateAPI
      .post(`posts/${id}/comment/`, {
        content: commentInput["input-comment"].value,
      })
      .then((response) => {
        commentInput.reset();
        getComment();
      })
      .catch((error) => console.log(error));
  };

  const deleteComment = async (commentId, e) => {
    await fetch(
      `http://127.0.0.1:8000/api/v1/posts/comment/${commentId}/delete/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    ).then((response) => {
      console.log(response);
      getComment();
    });
    // .then((result) => console.log(result));
  };

  const updateComment = async (commentID, e) => {
    if (updateId === commentID) {
      setUpdateID(false);
    } else {
      setUpdateID(commentID);
    }
    // await fetch (
    //   `http://127.0.0.1:8000/api/v1/posts/comment/${commentId}/`,{
    //       method:"POST",
    //       headers: {
    //         "Content-Type": "application/json; charset=utf-8",
    //         Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //       },
    //   }
    // )
  };

  const sendUpdateComment = async (e, commentID) => {
    e.preventDefault();
    console.log(e);
    await fetch(`http://127.0.0.1:8000/api/v1/posts/comment/${commentID}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        content: document.getElementById("update-comment").value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUpdateID(false);
        getComment();
      });
  };

  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      <form id="comment-form" onSubmit={onSubmit}>
        <label htmlFor="input-comment">댓글 : </label>
        <input
          id="input-comment"
          name="input-comment"
          palceholder="댓글..."
          style={{ width: "500px" }}
        />
        <button
          style={{ backgroundColor: "transparent", border: "none" }}
          onClick={onSubmit}
        >
          ⬆️
        </button>
      </form>
      {showComments ? (
        comments.length === 0 ? (
          <p>댓글이 없습니다 💭</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment.id}>
                <strong>{comment.author.nickname}</strong>{" "}
                {updateId === comment.id ? (
                  <div>
                    <form>
                      <input
                        id="update-comment"
                        defaultValue={comment.content}
                        style={{ width: "500px" }}
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
