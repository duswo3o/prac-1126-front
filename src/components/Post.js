import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { publicAPI, privateAPI } from "../axiosInstance";

function Post({ id }) {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [likeUser, setLikeUser] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);

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
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    } else {
      setIsAuthor(false);
    }
  };

  const getPost = async () => {
    const json = await publicAPI.get(`posts/${id}/`);
    const data = json.data;
    setPost(data);
    setLoading(false);
    let likeUsers = data.like.map((l) => l.email);

    if (likeUsers.includes(localStorage.getItem("email"))) {
      setLikeUser(true);
    } else {
      setLikeUser(false);
    }
    getUser(data.author.id);
  };

  const likeBtn = async () => {
    const json = await await privateAPI.post(`posts/${id}/like/`);
    const data = json.data;
    {
      data.message === "좋아요" ? setLikeUser(true) : setLikeUser(false);
    }
    console.log(data); // 좋아요 상태 출력
  };

  const showComment = () => {
    setShowComments((current) => !current);
  };

  const deletePost = async () => {
    const json = await privateAPI.post(`posts/${id}/delete/`);
    console.log(json.data);
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
          <div style={{ display: "flex", justifyContent: "space-between" }}>
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
            {isAuthor ? (
              <div>
                <Link to={`/${id}/update`}>
                  <button style={{ height: "30px" }}>수정</button>
                </Link>
                <button style={{ height: "30px" }} onClick={deletePost}>
                  {" "}
                  삭제{" "}
                </button>
              </div>
            ) : null}
          </div>
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
          <Comment id={id} showComments={showComments} />
          <hr />
        </div>
      )}
    </div>
  );
}

export default Post;
