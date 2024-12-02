function CreatePost() {
  const onSubmit = async (event) => {
    event.preventDefault();
    const inputImg = document.getElementById("input-img");
    console.log(inputImg.files[0]);
    const postCreateForm = event.target.form;

    const formData = new FormData();
    formData.append("image", inputImg.files[0]);
    formData.append("content", postCreateForm["input-content"].value);
    console.log(formData);

    await fetch("http://127.0.0.1:8000/api/v1/posts/create/", {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        postCreateForm.reset();
      });
    //   .catch((error) => console.log(error));
  };

  return (
    <div>
      <h3>CreatePost</h3>
      <form onSubmit={onSubmit} id="post-form">
        <input
          type="file"
          accept="image/*"
          required
          id="input-img"
          name="input-img"
        ></input>
        <br />
        <input
          type="text"
          id="input-content"
          name="input-content"
          style={{ width: "500px", height: "100px" }}
          required
        ></input>
        <br />
        <button onClick={onSubmit}>제출하기</button>
      </form>
    </div>
  );
}

export default CreatePost;
