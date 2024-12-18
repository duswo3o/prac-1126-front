import react from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";
import style from "./profile.module.css";
import Comment from "../components/Comment";
import Post from "../components/Post";
import FollowModal from "../components/FollowModal";

function Profile() {
  const { nickname } = useParams();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isProfileUser, setIsProfileUser] = useState(false);

  const [showFollowerModal, setShowFollowerModal] = useState("none");
  const [showFollowingModal, setShowFollowingModal] = useState("none");
  const [showPostModal, setshowPostModal] = useState("none");
  const [curCrosel, setCurCrosel] = useState(0);

  const CAROUSEL_LENGTH = document.querySelectorAll(".cell").length - 1; // 캐러샐의 갯수

  const findCarousel = () => {
    const carousel = document.getElementById("carousel");
    return carousel;
  };
  // console.log(carousel);

  const nextEvent = () => {
    const carousel = findCarousel();
    if (curCrosel < CAROUSEL_LENGTH) {
      carousel.style.transform = `translateX(${(curCrosel + 1) * -600}px)`;
      setCurCrosel((cur) => cur + 1);
    } else {
      setCurCrosel(0);
      carousel.style.transform = `translateX(0px)`;
    }
    // console.log(curCrosel);
  };

  const prevEvent = () => {
    const carousel = findCarousel();
    if (curCrosel > 0) {
      carousel.style.transform = `translateX(${(curCrosel - 1) * -600}px)`;
      setCurCrosel((cur) => cur - 1);
    } else {
      setCurCrosel(CAROUSEL_LENGTH);
      carousel.style.transform = `translateX(${CAROUSEL_LENGTH * -600}px)`;
    }
    // console.log(curCrosel);
  };

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
    // console.log(data)
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

  const showFollower = () => {
    // const followers = userInfo.followers;
    // console.log(followers);
    setShowFollowerModal("flex");
  };

  const showFollowing = () => {
    // console.log("following list clicked");
    setShowFollowingModal("flex");
    // console.log("profile route : ", showFollowingModal);
  };

  const showPost = async (e, idx) => {
    const carousel = findCarousel();
    setCurCrosel(idx);
    // console.log(idx);
    carousel.style.transform = `translateX(${idx * -600}px)`;
    setshowPostModal("flex");
  };

  const closeFollowingModal = () => {
    setShowFollowingModal("none");
  };

  const closeFollowerModal = () => {
    setShowFollowerModal("none");
  };

  const hidePost = () => {
    setshowPostModal("none");
  };

  useEffect(() => {
    getProfile();
  }, [isFollow, nickname]);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>{userInfo.nickname}'s Profile</h3>

          {/* 팔로워, 팔로잉 모달 */}          
          <FollowModal
          showModal={showFollowerModal}
          closeModal={closeFollowerModal}
          follows={userInfo.followers}
          />
          <FollowModal
            showModal={showFollowingModal}
            closeModal={closeFollowingModal}
            follows={userInfo.followings}
          />

          <div
            className={style.modal}
            id="post-modal"
            style={{ display: showPostModal }}
          >
            <div className={style.modal_body}>
              <div
                style={{ float: "right", cursor: "pointer" }}
                onClick={hidePost}
              >
                [X]
              </div>

              {/* 캐로셀 들어갈 자리 */}
              <div className={style.container}>
                <div className={style.carousel} id="carousel">
                  {userInfo.posts.map((post) => (
                    <div
                      key={post.id}
                      className="cell"
                      style={{ display: "flex" }}
                    >
                      <div style={{ width: "400px" }}>
                        <Post id={post.id} />
                      </div>
                      <div style={{ width: "200px" }}>
                        <Comment id={post.id} showComments={true} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={style.prev_btn} id="prev-btn" onClick={prevEvent}>
                이전
              </div>
              <div className={style.next_btn} id="next-btn" onClick={nextEvent}>
                다음
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <img
                src={`http://127.0.0.1:8000${userInfo.image}`}
                alt=""
                style={{ width: "70px", height: "70px", borderRadius: "50px" }}
              />
              {isProfileUser ? (
                <div>
                  <Link to={`/${nickname}/edit`}>
                    <button>프로필 수정</button>
                  </Link>
                </div>
              ) : (
                <div>
                  <button onClick={followBtn}>
                    {isFollow ? "팔로잉" : "팔로우"}
                  </button>
                </div>
              )}
            </div>

            <div style={{ display: "flex" }}>
              <div style={{ padding: "5px", margin: "3px" }}>
                {userInfo.posts.length}
                <br />
                <span>게시물</span>
              </div>
              <div
                style={{ padding: "5px", margin: "3px" }}
                onClick={showFollower}
              >
                {userInfo.followers.length}
                <br />
                <span>팔로워</span>
              </div>
              <div
                style={{ padding: "5px", margin: "3px" }}
                onClick={showFollowing}
              >
                {userInfo.followings.length}
                <br />
                <span>팔로잉</span>
              </div>
            </div>
          </div>

          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userInfo.bio}
          </div>

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
                  width: "200px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={(e) => showPost(e, userInfo.posts.indexOf(post))}
              >
                <img
                  src={`http://127.0.0.1:8000${post.image}`}
                  alt=""
                  style={{ width: "100%" }}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
