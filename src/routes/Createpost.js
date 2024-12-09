import { useNavigate } from "react-router-dom";
import { privateAPI } from "../axiosInstance";

function CreatePost() {
  const navigate = useNavigate()
  const onSubmit = async (event) => {
    event.preventDefault();
    const inputImg = document.getElementById("input-img");
    console.log(inputImg.files[0]);
    const postCreateForm = event.target.form;

    const formData = new FormData();
    formData.append("image", inputImg.files[0]);
    formData.append("content", postCreateForm["input-content"].value);
    // console.log(formData);

    await privateAPI
      .post("posts/create/", formData)
      .then((response) => {
        console.log(response.data);
        postCreateForm.reset();
        navigate("/")
      })
      .catch((error) => console.log(error.response));
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
