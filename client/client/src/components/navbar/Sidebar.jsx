import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

function Sidebar() {
  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Menu</h3>
      <nav className="sidebar-nav">
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/blog-list">Blog List</NavLink>
        <NavLink to="/comments">Comments</NavLink>
        <NavLink to="/profile">Profile</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;