import { Link } from 'react-router-dom';
import '../styles/ViewBlog.css';

function ViewBlog({ blog }) {
  if (!blog) {
    return (
      <div className="view-blog">
        <p>No blog selected.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="view-blog">
      <Link to="/">← Back to Home</Link>
      <h2>{blog.title}</h2>
      <p className="view-blog-meta">
        By {blog.author} • {blog.date} • Category: {blog.category}
      </p>
      <p className="view-blog-content">{blog.content}</p>
      <div className="view-blog-stats">
        <span>❤ {blog.likes} Likes</span>
        <span>💬 {blog.comments} Comments</span>
        <span>👁 {blog.views} Views</span>
      </div>
    </div>
  );
}

export default ViewBlog;