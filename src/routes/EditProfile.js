import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { publicAPI, privateAPI } from "../axiosInstance";

function EditProfile() {
  const { nickname } = useParams();
  const [user, setUser] = useState([]);
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

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
    const editImg = document.getElementById("edit-img").files[0];
    const formData = new FormData();

    formData.append("nickname", editForm["edit-nickname"].value);
    formData.append("bio", editForm["edit-bio"].value);
    formData.append("gender", editForm["edit-gender"].value);

    // console.log(editImg);
    if (editImg) {
      formData.append("image", editImg);
    }

    await privateAPI
      .post(`accounts/${nickname}/edit-profile/`, formData)
      .then((response) => {
        // console.log(response.data);
        alert("프로필 정보가 수정되었습니다");
        navigate(`/profile/${nickname}`);
      });
  };

  const deleteUser = async () => {
    const deleteConfirm = window.confirm("계정을 삭제하시겠습니까?");
    if (deleteConfirm) {
      await privateAPI
        .post("accounts/delete/")
        .then((response) => {
          // console.log(response.data);
          localStorage.clear();
          alert("계정이 삭제되었습니다");
          window.location.href = "http://localhost:3000";
        })
        .catch((error) => {
          const errMsg = error.response.data;
          console.log(errMsg);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      <h3>프로필 편집</h3>
      <form id="edit-form">
        <label>프로필 이미지</label>
        <input type="file" accept="image/*" id="edit-img" />
        <br />
        <br />

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
