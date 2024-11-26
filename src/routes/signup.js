function SignUp() {
  function onSubmit(event) {
    event.preventDefault();
    const signUpForm = event.target.form;
    fetch("http://127.0.0.1:8000/api/v1/accounts/", {
      method: "POST",
      headers: {
        //데이터 타입 지정
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        email: signUpForm["input-email"].value,
        password: signUpForm["input-password"].value,
        confirm_password: signUpForm["input-confirm-password"].value,
        nickname: signUpForm["input-nickname"].value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        signUpForm.reset();
      })
      .catch((error) => console.log(error));
  }
  return (
    <div>
      <form id="signup-form" onSubmit={onSubmit}>
        <label htmlFor="input-email">email : </label>
        <input id="input-email" name="email" type="email" placeholder="email" required />
        <br />
        <label htmlFor="input-password" >password : </label>
        <input id="input-password" name="password" type="password" placeholder="password" required />
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
        <input id="input-nickname" name="nickname" type="text" placeholder="nickname" required />
        <br />
        <button onClick={onSubmit}>submit</button>
      </form>
    </div>
  );
}

export default SignUp;
