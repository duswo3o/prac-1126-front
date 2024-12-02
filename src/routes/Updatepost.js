import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UpdatePost() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const getPost = async () => {
    const json = await (
      await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/`)
    ).json();
    // console.log(json);
    // console.log(json.image.split("/").pop());
    setPost(json);
  };

  const updatePost = async (event) => {
    event.preventDefault();
    const updateImg = document.getElementById("update-img").files[0];

    const formData = new FormData();
    if (updateImg) {
      formData.append("image", updateImg);
    }
    formData.append("content", document.getElementById("update-content").value);
    console.log(formData);

    await fetch(`http://127.0.0.1:8000/api/v1/posts/${id}/update/`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => console.log(result));
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div>
      <h3>Update Post</h3>
      <form id="update-form" onSubmit={updatePost}>
        <input id="update-img" type="file" accept="image/*" />
        <input
          id="update-content"
          style={{ width: "500px", height: "100px" }}
          defaultValue={post.content}
        />
        <br />
        <button onClick={updatePost}>수정</button>
      </form>
    </div>
  );
}

export default UpdatePost;
