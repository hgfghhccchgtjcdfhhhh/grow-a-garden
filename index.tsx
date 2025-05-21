import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';

type BlogPostType = {
  id: number;
  title: string;
  content: string;
  date: string;
};

const BlogPost = ({ title, content, date }: BlogPostType) => (
  <article className="blog-post">
    <h2>{title}</h2>
    <small>{new Date(date).toLocaleString()}</small>
    <p>{content}</p>
  </article>
);

const App = () => {
  const [posts, setPosts] = useState<BlogPostType[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const fetchPosts = async () => {
    const res = await fetch('http://localhost:4000/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async () => {
    if (!title.trim() || !content.trim()) return;

    const res = await fetch('http://localhost:4000/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      setTitle('');
      setContent('');
      fetchPosts();
    }
  };

  return (
    <main>
      <h1>Grow a Garden Fan Blog</h1>

      <section className="blog-form">
        <input
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write your blog post here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </section>

      <section className="blog-posts">
        {posts.length === 0 && <p>No posts yet — be the first to write one!</p>}
        {posts.map((post) => (
          <BlogPost key={post.id} {...post} />
        ))}
      </section>
    </main>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
