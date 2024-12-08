import { publicAPI } from "../axiosInstance";

function SignIn() {
  function onSubmit(event) {
    event.preventDefault();
    const signinForm = event.target.form;
    // console.log(event.target.form);
    // console.log(event.target["signin-email"].value);
    publicAPI
      .post("accounts/signin/", {
        email: signinForm["signin-email"].value,
        password: signinForm["signin-password"].value,
      })
      .then((response) => {
        // console.log(response.data);
        const data = response.data;
        localStorage.setItem("accessToken", data.access);
        localStorage.setItem("refreshToken", data.refresh);
        localStorage.setItem("email", signinForm["signin-email"].value);
        signinForm.reset();
        window.location.href = "http://localhost:3000";
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  return (
    <div>
      <form id="signin-form" onSubmit={onSubmit}>
        <label htmlFor="signin-email">email : </label>
        <input
          id="signin-email"
          name="signin-email"
          type="email"
          placeholder="email"
          required
        />
        <br />
        <label htmlFor="signin-password">password : </label>
        <input
          id="signin-password"
          name="signin-password"
          type="password"
          placeholder="password"
          required
        />
        <br />
        <button onClick={onSubmit}>Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
