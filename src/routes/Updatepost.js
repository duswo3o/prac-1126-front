import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { publicAPI, privateAPI } from "../axiosInstance";

function UpdatePost() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const getPost = async () => {
    const json = await publicAPI.get(`posts/${id}/`);
    const data = json.data;
    // console.log(json);
    // console.log(json.image.split("/").pop());
    setPost(data);
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

    await privateAPI
      .post(`posts/${id}/update/`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
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
