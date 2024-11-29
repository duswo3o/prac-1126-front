import react from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Profile() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);

  const getProfile = async () => {
    const user = await (
      await fetch(`http://127.0.0.1:8000/api/v1/accounts/${nickname}/`)
    ).json();
    setUserInfo(user);
    setLoading(false);
    console.log(user);
    return;
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>
            <strong>{userInfo.nickname}</strong>'s Profile
          </h3>
          {/* <p>{nickname}</p>
          <p>email : {userInfo.email}</p> */}
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
