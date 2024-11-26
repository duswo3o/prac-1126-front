function SignIn() {
  function onSubmit(event) {
    event.preventDefault();
    const signinForm = event.target.form;
    // console.log(event.target.form);
    // console.log(event.target["signin-email"].value);
    fetch("http://127.0.0.1:8000/api/v1/accounts/signin/", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        email: signinForm["signin-email"].value,
        password: signinForm["signin-password"].value,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        signinForm.reset();
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
