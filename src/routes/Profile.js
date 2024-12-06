import react from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";

function Profile() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isProfileUser, setIsProfileUser] = useState(false);

  function isSameUser(profileID) {
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
      if (decodedJWT.user_id === profileID) {
        setIsProfileUser(true);
      } else {
        setIsProfileUser(false);
      }
    }
  }

  const getProfile = async () => {
    const user = await publicAPI.get(`accounts/${nickname}/`);
    const data = user.data;
    setUserInfo(data);
    setLoading(false);
    // console.log(user);
    const followers = data.followers.map((f) => f.email);
    // console.log(followers);
    {
      followers.includes(localStorage.getItem("email"))
        ? setIsFollow(true)
        : setIsFollow(false);
    }
    isSameUser(data.id);
    // console.log(user)
    return;
  };

  const followBtn = async () => {
    const json = await privateAPI.post(`accounts/${nickname}/follow/`);
    // console.log(json);
    const data = json.data;
    const followMsg = `${nickname}님을 팔로우하였습니다.`;
    if (data.message === followMsg) {
      setIsFollow(true);
    } else {
      setIsFollow(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [isFollow]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>{userInfo.nickname}'s Profile</h3>
          {isProfileUser ? (
            <div>
              <Link to={`/${nickname}/edit`}>
                <button>프로필 수정</button>
              </Link>
            </div>
          ) : (
            <button onClick={followBtn}>
              {isFollow ? "팔로잉" : "팔로우"}
            </button>
          )}
          <div style={{ display: "flex" }}>
            <div style={{ padding: "5px", margin: "3px" }}>
              {userInfo.posts.length}
              <br />
              <span>게시물</span>
            </div>
            <div style={{ padding: "5px", margin: "3px" }}>
              {userInfo.followers.length}
              <br />
              <span>팔로워</span>
            </div>
            <div style={{ padding: "5px", margin: "3px" }}>
              {userInfo.followings.length}
              <br />
              <span>팔로잉</span>
            </div>
          </div>
          <br />
          <div>{userInfo.bio}</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userInfo.posts.map((post) => (
              <div
                key={post.id}
                style={{
                  width: "300px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{ width: "100%" }}
                  src="https://velog.velcdn.com/images/woowoon920/post/2c808829-e449-4e43-814d-04ed70c5557f/image.png"
                  alt=""
                />
                <div>
                  <span> ❤️ {post.like_count} </span>
                  <span> 💬 {post.comments.length}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
