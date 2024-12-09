import { publicAPI } from "../axiosInstance";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    const signUpForm = event.target.form;
    const formData = new FormData();

    formData.append("email", signUpForm["input-email"].value);
    formData.append("password", signUpForm["input-password"].value);
    formData.append(
      "confirm_password",
      signUpForm["input-confirm-password"].value
    );
    formData.append("nickname", signUpForm["input-nickname"].value);

    const inputImg = document.getElementById("input-img").files[0];
    console.log(inputImg);
    if (inputImg) {
      formData.append("image", inputImg);
    }

    publicAPI
      .post("accounts/", formData)
      .then((response) => {
        // console.log(response);
        // const data = response.data
        signUpForm.reset();
        alert("회원가입에 성공하였습니다. 로그인을 시도해주세요. ");
        navigate("/signin");
      })
      .catch((error) => {
        console.log(error.response);
        const errMsg = error.response.data;
        alert(errMsg.message || "이미 사용중인 이메일 혹은 닉네임입니다. ");
      });
  }
  return (
    <div>
      <form id="signup-form" onSubmit={onSubmit}>
        <label htmlFor="input-email">email : </label>
        <input
          id="input-email"
          name="email"
          type="email"
          placeholder="email"
          required
        />
        <br />
        <label htmlFor="input-password">password : </label>
        <input
          id="input-password"
          name="password"
          type="password"
          placeholder="password"
          required
        />
        <br />
        <label htmlFor="input-confirm-password">confirm password : </label>
        <input
          id="input-confirm-password"
          name="confirm-password"
          type="password"
          placeholder="confirm password"
          required
        />
        <br />
        <label htmlFor="input-nickname">nickname : </label>
        <input
          id="input-nickname"
          name="nickname"
          type="text"
          placeholder="nickname"
          required
        />
        <br />
        <label>profile image : </label>
        <input type="file" accept="image/*" id="input-img" />
        <br />
        <br />
        <button onClick={onSubmit}>submit</button>
      </form>
    </div>
  );
}

export default SignUp;
