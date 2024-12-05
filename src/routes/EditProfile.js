import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditProfile() {
  const { nickname } = useParams();
  const [user, setUser] = useState([]);
  const [gender, setGender] = useState(null);

  const getProfile = async () => {
    const profile = await (
      await fetch(`http://127.0.0.1:8000/api/v1/accounts/${nickname}/`)
    ).json();
    // console.log(profile);
    setUser(profile);
    setGender(profile.gender);
  };

  const editProfile = async (event) => {
    event.preventDefault();
    // console.log(event);
    const editForm = event.target.form;
    const json = await (
      await fetch(
        `http://127.0.0.1:8000/api/v1/accounts/${nickname}/edit-profile/`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
            "Content-Type": "application/json; charset=utf-8",
          },
          body: JSON.stringify({
            nickname: editForm["edit-nickname"].value,
            bio: editForm["edit-bio"].value,
            gender: editForm["edit-gender"].value,
          }),
        }
      )
    ).json();
    console.log(json);
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
          <option value="W">여자</option>
          <option value="N">비공개</option>
        </select>
        <br />
        <br />
        <button onClick={editProfile}>수정완료</button>
      </form>
    </div>
  );
}

export default EditProfile;
