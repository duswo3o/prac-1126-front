import react from "react";
import { useParams } from "react-router-dom";
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
    return;
  };
  useEffect(() => {getProfile()}, []);
  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>
            <strong>{userInfo.nickname}</strong>'s Profile
          </h3>
          <p>{nickname}</p>
          <p>email : {userInfo.email}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
