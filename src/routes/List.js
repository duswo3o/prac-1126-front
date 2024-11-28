import { useEffect, useState } from "react";
import Post from "../components/Post";

function List() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const postList = await (
      await fetch("http://127.0.0.1:8000/api/v1/posts/")
    ).json();
    setPosts(postList);
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
            <Post
              key={post.id}
              image={post.image}
              author={post.author}
              content={post.content}
              created={post.created_at}
              comments={post.comments}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default List;
