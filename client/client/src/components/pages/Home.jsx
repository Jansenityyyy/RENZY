import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getArticles } from '../../services/articleService';
import BlogCard from '../card/blogCard';
import '../styles/Home.css';

function Home({ onSelectBlog }) {
  const [blogs, setBlogs] = useState([]);
  const [countBlogs, setCountBlogs] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    const fetchAllArticles = async () => {
      try {
        const result = await getArticles();
        if (ignore) return;
        setBlogs(result);
        setCountBlogs(result.length);
      } catch (err) {
        if (ignore) return;
        console.log('Failed to fetch articles');
        console.error(err);
        setError('Failed to load blogs. Please make sure the server is running.');
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchAllArticles();

    return () => {
      ignore = true;
    };
  }, []);

  const categories = ['All', ...new Set(blogs.map((blog) => blog.category))];

  const visibleBlogs = blogs
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(
      (blog) => selectedCategory === 'All' || blog.category === selectedCategory
    )
    .sort((a, b) =>
      sortBy === 'popular'
        ? b.likes - a.likes
        : new Date(b.date) - new Date(a.date)
    );

  const handleViewBlog = (blog) => {
    onSelectBlog(blog);
    navigate('/blog');
  };

  if (loading) {
    return (
      <div className="home">
        <p className="no-blogs">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home">
        <p className="no-blogs">{error}</p>
      </div>
    );
  }

  return (
    <div className="home">
      <h2>{sortBy === 'popular' ? 'Popular Blogs' : 'Latest Blogs'}</h2>
      <p className="blog-count">Total Blog Count: {countBlogs}</p>

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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="blog-tabs">
        <button onClick={() => setSortBy('latest')}>Latest</button>
        <button onClick={() => setSortBy('popular')}>Popular</button>
      </div>

      <div className="blog-list">
        {visibleBlogs.length > 0 ? (
          visibleBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onView={handleViewBlog} />
          ))
        ) : (
          <p className="no-blogs">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Home;