import { useEffect, useState } from "react";

function Comment({ id, showComments }) {
  const [comments, setComments] = useState([]);

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
    fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/comment/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify({
        content: commentInput["input-comment"].value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        commentInput.reset();
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
                <span>{comment.content}</span>{" "}
                <span
                  style={{
                    color: "gray",
                    fontSize: "10px",
                  }}
                >
                  {comment.created_at.slice(0, 10)}
                </span>
              </div>
            ))}
          </div>
        )
      ) : null}
    </div>
  );
}

export default Comment;
