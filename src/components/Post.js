import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";

function Post({ id }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [likeUser, setLikeUser] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const getPost = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`)
    ).json();
    setPost(json);
    setLoading(false);
    let likeUsers = json.like.map((l) => l.email);
    {
      likeUsers.includes(localStorage.getItem("email")) // 해당 포스트
        ? setLikeUser(true)
        : setLikeUser(false);
    }
  };

  const likeBtn = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/like/`, {
        method: "POST",
        headers: {
          // 나중에는 로그인시에 토큰을 스토리지에 저장하고, 가져와서 사용해야 함
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/json; charset=utf-8",
        },
      })
    ).json();
    {
      json.message === "좋아요" ? setLikeUser(true) : setLikeUser(false);
    }
    console.log(json); // 좋아요 상태 출력
  };

  const showComment = () => {
    setShowComments((current) => !current);
  };

  useEffect(() => {
    getPost();
  }, [likeUser]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <Link
            to={`/profile/${post.author.nickname}`}
            style={{
              textDecoration: "none",
              color: "black",
              cursor: "pointer",
            }}
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
              <span>{post.author.nickname}</span>
            </p>
          </Link>
          <img
            src="https://velog.velcdn.com/images/woowoon920/post/2c808829-e449-4e43-814d-04ed70c5557f/image.png"
            alt="blank"
          />
          <br />
          <p>
            <strong>{post.author.nickname} </strong>
            {post.content} <br />
            <span style={{ color: "gray", fontSize: "12px" }}>
              {post.created_at.slice(0, 10)}{" "}
            </span>
          </p>
          <span onClick={likeBtn} style={{ cursor: "pointer" }}>
            {likeUser ? "❤️" : "🤍"}{" "}
          </span>{" "}
          <span> {post.like_count} </span>
          <span onClick={showComment} style={{ cursor: "pointer" }}>
            {" "}
            💬{" "}
          </span>{" "}
          <span>{post.comments.length}</span>
          <Comment id={id} showComments={showComments}/>
          <hr />
        </div>
      )}
    </div>
  );
}

export default Post;
