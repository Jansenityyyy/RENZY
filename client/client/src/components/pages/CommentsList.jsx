import { useState } from 'react';
import { COMMENTS } from '../config/Constants';
import '../styles/CommentsList.css';

function CommentsList({ blogs, selectedBlog }) {
  const [activeId, setActiveId] = useState(selectedBlog ? selectedBlog.id : blogs[0]?.id);

  const activeBlog = blogs.find((b) => b.id === activeId);
  const comments = COMMENTS.filter((c) => c.blogId === activeId);

  return (
    <div className="comments-page">
      <h2>Comments</h2>

      <select
        className="comments-select"
        value={activeId ?? ''}
        onChange={(e) => setActiveId(Number(e.target.value))}
      >
        {blogs.map((b) => (
          <option key={b.id} value={b.id}>
            {b.title}
          </option>
        ))}
      </select>

      {activeBlog ? (
        <>
          <p className="comments-summary">
            {comments.length} comment{comments.length !== 1 ? 's' : ''} on <strong>{activeBlog.title}</strong>
          </p>

          {comments.length > 0 ? (
            <ul className="comments-list">
              {comments.map((c) => (
                <li key={c.id} className="comment-item">
                  <div className="comment-head">
                    <strong>{c.author}</strong>
                    <small>{c.date}</small>
                  </div>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-comments">No comments yet for this blog.</p>
          )}
        </>
      ) : (
        <p className="no-comments">No blog selected.</p>
      )}
    </div>
  );
}

export default CommentsList;