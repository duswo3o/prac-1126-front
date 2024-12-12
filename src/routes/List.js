import { useEffect, useState } from "react";
import Post from "../components/Post";
import Comment from "../components/Comment";

import { publicAPI } from "../axiosInstance";

function List() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const postList = await publicAPI.get("posts/");
    const data = postList.data;
    setPosts(data);
    setLoading(false);
    return;
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <h3>Post List</h3>
          {posts.map((post) => (
            <div key={post.id}>
              <div style={{width:"600px"}}>
              <Post id={post.id} likeCount={post.like_count} />
              </div>
              <Comment id={post.id} />
              <br />
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
