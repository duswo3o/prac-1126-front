import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";

function EditProfile() {
  const { nickname } = useParams();
  const [user, setUser] = useState([]);
  const [gender, setGender] = useState(null);

  const getProfile = async () => {
    const profile = await publicAPI.get(`accounts/${nickname}/`);
    // console.log(profile);
    const data = profile.data;
    setUser(data);
    setGender(data.gender);
  };

  const editProfile = async (event) => {
    event.preventDefault();
    // console.log(event);
    const editForm = event.target.form;
    const json = await privateAPI.post(`accounts/${nickname}/edit-profile/`, {
      nickname: editForm["edit-nickname"].value,
      bio: editForm["edit-bio"].value,
      gender: editForm["edit-gender"].value,
    });
    console.log(json.data);
  };

  const deleteUser = async () => {
    const json = await privateAPI.post("accounts/delete/");
    console.log(json.data);
    localStorage.clear();
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h3>프로필 편집</h3>
      <form id="edit-form">
        <label>nickname : </label>
        <input
          id="edit-nickname"
          style={{ width: "300px" }}
          defaultValue={user.nickname}
        />
        <br />
        <br />
        <label>introduce : </label>
        <input
          id="edit-bio"
          style={{ width: "300px", height: "50px" }}
          defaultValue={user.bio}
        />
        <br />
        <br />
        <label>gender : </label>
        <select
          id="edit-gender"
          style={{ width: "300px" }}
          defaultValue={gender}
          key={gender}
        >
          <option value="M">남자</option>
          <option value="F">여자</option>
          <option value="N">비공개</option>
        </select>
        <br />
        <br />
        <button onClick={editProfile}>수정완료</button>
      </form>
      <div style={{ width: "400px" }}>
        <button
          style={{ float: "right", backgroundColor: "tomato", color: "white" }}
          onClick={deleteUser}
        >
          회원탈퇴
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
