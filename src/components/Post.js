// import { useState } from "react";
import { Link } from "react-router-dom";

function Movie({ image, author, content, created, comments }) {
  //   const [showComment, setShowComment] = useState(false);
  //   console.log(comments[0].content);

  return (
    <div>
      <Link
        to={`/profile/${author.nickname}`}
        style={{ textDecoration: "none", color: "black", cursor: "pointer" }}
      >
        <p>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="default profile image"
            style={{
              height: "30px",
              borderRadius: "50%",
            }}
          />{" "}
          <span>{author.nickname}</span>
        </p>
      </Link>
      <img
        src="https://velog.velcdn.com/images/woowoon920/post/2c808829-e449-4e43-814d-04ed70c5557f/image.png"
        alt="blank"
      />
      <br />
      <span>작성일자 : {created.slice(0, 10)} </span>
      <p>{content}</p>
      <div
        style={{
          border: "1px solid",
          padding: "5px",
        }}
      >
        <strong> 💬 </strong>
        {comments.map((comment) => (
          <div>
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
      <hr />
    </div>
  );
}

export default Movie;
