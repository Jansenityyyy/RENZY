import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getArticles,
  createArticle,
  updateArticle,
  deleteArticle,
  likeArticle,
} from '../../services/articleService';
import { getErrorMessage } from '../../services/api';
import BlogModal from '../modal/BlogModal';
import ConfirmPopUp from '../modal/ConfirmPopUp';
import SuccessPopUp from '../modal/SuccessPopUp';
import FailedPopUp from '../modal/FailedPopUp';
import Loading from '../loading/Loading';
import '../styles/BlogList.css';

function BlogList({ user, onSelectBlog }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [reloadKey, setReloadKey] = useState(0);
  const [busyMessage, setBusyMessage] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [notice, setNotice] = useState(null);
  const [failedMessage, setFailedMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchAllArticles = async () => {
      try {
        const result = await getArticles();
        if (!ignore) setBlogs(result);
      } catch (err) {
        console.error(err);
        if (!ignore) setLoadError(getErrorMessage(err, 'Failed to load blogs.'));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchAllArticles();

    return () => {
      ignore = true;
    };
  }, [reloadKey]);

  const handleRetry = () => {
    setLoading(true);
    setLoadError('');
    setReloadKey((key) => key + 1);
  };

  // Nagpapakita ng loading overlay habang tumatakbo ang isang aksyon
  const withBusy = async (message, action, fallback) => {
    setBusyMessage(message);
    try {
      await action();
      return true;
    } catch (error) {
      console.error(error);
      setFailedMessage(getErrorMessage(error, fallback));
      return false;
    } finally {
      setBusyMessage('');
    }
  };

  const categories = [...new Set(blogs.map((blog) => blog.category))];

  const visibleBlogs = blogs
    .filter((blog) => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((blog) => selectedCategory === 'All' || blog.category === selectedCategory);

  const openCreate = () => {
    setEditingBlog(null);
    setModalOpen(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingBlog(null);
  };

  const handleSave = async (form) => {
    const isEdit = Boolean(editingBlog);

    const ok = await withBusy(
      isEdit ? 'Updating blog...' : 'Creating blog...',
      async () => {
        if (isEdit) {
          const updated = await updateArticle(editingBlog.id, form);
          setBlogs((prev) =>
            prev.map((b) =>
              b.id === editingBlog.id ? { ...b, ...updated, comments: b.comments } : b
            )
          );
          setNotice({
            title: 'Blog Updated',
            message: `"${form.title}" was updated successfully.`,
          });
        } else {
          const created = await createArticle({ ...form, author: user.name });
          setBlogs((prev) => [{ ...created, comments: 0 }, ...prev]);
          setNotice({
            title: 'Blog Created',
            message: `"${form.title}" was posted successfully.`,
          });
        }
      },
      'Failed to save the blog.'
    );

    if (ok) closeModal();
  };

  const handleLike = async (id) => {
    try {
      const updated = await likeArticle(id);
      setBlogs((prev) =>
        prev.map((b) => (b.id === id ? { ...b, likes: updated.likes } : b))
      );
    } catch (error) {
      console.error(error);
      setFailedMessage(getErrorMessage(error, 'Failed to like the blog.'));
    }
  };

  const handleConfirmDelete = async () => {
    const target = deleteTarget;
    setDeleteTarget(null);

    await withBusy(
      'Deleting blog...',
      async () => {
        await deleteArticle(target.id);
        setBlogs((prev) => prev.filter((b) => b.id !== target.id));
        setNotice({
          title: 'Blog Deleted',
          message: `"${target.title}" was deleted.`,
        });
      },
      'Failed to delete the blog.'
    );
  };

  const handleView = (blog) => {
    onSelectBlog(blog);
    navigate('/blog');
  };

  const handleComments = (blog) => {
    onSelectBlog(blog);
    navigate('/comments');
  };

  if (loading) return <Loading message="Loading blogs..." />;

  if (loadError) {
    return (
      <div className="blog-list-page">
        <h2>Blog List</h2>
        <p className="no-blogs">{loadError}</p>
        <button onClick={handleRetry}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="blog-list-page">
      <div className="blog-list-header">
        <h2>Blog List</h2>
        <button className="btn-create" onClick={openCreate}>
          + Create Blog
        </button>
      </div>

      <div className="blog-controls">
        <input
          type="text"
          className="blog-search"
          placeholder="Search blog title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="blog-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="table-wrapper">
        <table className="blog-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>❤ Likes</th>
              <th>💬</th>
              <th>👁</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleBlogs.length > 0 ? (
              visibleBlogs.map((blog) => (
                <tr key={blog.id}>
                  <td>{blog.title}</td>
                  <td>{blog.category}</td>
                  <td>{blog.author}</td>
                  <td>{blog.date}</td>
                  <td>{blog.likes}</td>
                  <td>{blog.comments}</td>
                  <td>{blog.views}</td>
                  <td className="actions">
                    <button onClick={() => handleLike(blog.id)}>Like</button>
                    <button onClick={() => handleView(blog)}>View</button>
                    <button onClick={() => handleComments(blog)}>Comments</button>
                    <button onClick={() => openEdit(blog)}>Edit</button>
                    <button className="btn-delete" onClick={() => setDeleteTarget(blog)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-blogs-cell">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <BlogModal
          blog={editingBlog}
          categories={categories}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}

      {deleteTarget && (
        <ConfirmPopUp
          title="Delete Blog?"
          message={`Are you sure you want to delete "${deleteTarget.title}"? This cannot be undone.`}
          confirmText="Delete"
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {notice && (
        <SuccessPopUp
          title={notice.title}
          message={notice.message}
          onClose={() => setNotice(null)}
        />
      )}

      {failedMessage && (
        <FailedPopUp
          title="Action Failed"
          message={failedMessage}
          onClose={() => setFailedMessage('')}
        />
      )}

      {busyMessage && <Loading message={busyMessage} overlay />}
    </div>
  );
}

export default BlogList;