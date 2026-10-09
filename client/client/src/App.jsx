import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/navbar/Header';
import Footer from './components/navbar/Footer';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import ViewBlog from './components/pages/ViewBlog';
import DashboardLayout from './components/pages/DashboardLayout';
import Dashboard from './components/pages/Dashboard';
import BlogList from './components/pages/BlogList';
import CommentsList from './components/pages/CommentsList';
import Profile from './components/pages/Profile';
import { BLOGS } from './components/config/Constants';

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState(BLOGS);
  const [selectedBlog, setSelectedBlog] = useState(null);

  const currentBlog =
    blogs.find((b) => b.id === selectedBlog?.id) || selectedBlog;

  const handleLike = (id) => {
    setBlogs((prev) =>
      prev.map((b) => (b.id === id ? { ...b, likes: b.likes + 1 } : b))
    );
  };

  return (
    <Router>
      <Header user={user} onLogout={() => setUser(null)} />
      <Routes>
        <Route path="/" element={<Home onSelectBlog={setSelectedBlog} />} />
        <Route
          path="/blog"
          element={<ViewBlog blog={currentBlog} onLike={handleLike} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />

        <Route element={<DashboardLayout user={user} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/blog-list"
            element={<BlogList user={user} onSelectBlog={setSelectedBlog} />}
          />
          <Route
            path="/comments"
            element={<CommentsList blogs={blogs} selectedBlog={currentBlog} />}
          />
          <Route path="/profile" element={<Profile blogs={blogs} />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;