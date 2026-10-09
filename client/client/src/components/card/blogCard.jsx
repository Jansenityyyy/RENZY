import '../styles/BlogCard.css';

function BlogCard({ blog, onView }) {
  return (
    <div className="blog-card">
      <div className="blog-card-body">
        <h3 className="blog-card-title">{blog.title}</h3>
        <p className="blog-card-meta">
          By {blog.author} • {blog.date}
        </p>
        <p className="blog-card-description">{blog.description}</p>
        <button className="blog-card-button" onClick={() => onView(blog)}>
          View Blog
        </button>
      </div>
    </div>
  );
}

export default BlogCard;