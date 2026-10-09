import { useState } from 'react';
import '../styles/BlogModal.css';

const DEFAULT_CATEGORIES = ['React', 'JavaScript', 'Web Development', 'Database', 'Other'];

function BlogModal({ blog, categories, onSave, onClose }) {
  const isEdit = Boolean(blog);
  const categoryOptions = [...new Set([...DEFAULT_CATEGORIES, ...categories])];

  const [form, setForm] = useState({
    title: blog?.title || '',
    category: blog?.category || categoryOptions[0],
    description: blog?.description || '',
    content: blog?.content || '',
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{isEdit ? 'Update Blog' : 'Create New Blog'}</h3>
        <form className="modal-form" onSubmit={handleSubmit}>
          <label>
            Title
            <input name="title" value={form.title} onChange={handleChange} required />
          </label>

          <label>
            Category
            <select name="category" value={form.category} onChange={handleChange}>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label>
            Short Description
            <input name="description" value={form.description} onChange={handleChange} required />
          </label>

          <label>
            Content
            <textarea name="content" rows="6" value={form.content} onChange={handleChange} required />
          </label>

          <div className="modal-actions">
            <button type="button" className="modal-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="modal-save">
              {isEdit ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BlogModal;