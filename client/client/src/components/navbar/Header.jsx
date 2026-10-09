import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmPopUp from '../modal/ConfirmPopUp';
import '../styles/Header.css';

function Header({ user, onLogout }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleConfirmLogout = () => {
    onLogout();
    setShowConfirm(false);
    navigate('/');
  };

  return (
    <>
      <header className="header">
        <h1 className="header-title">My Blog</h1>
        <nav className="header-nav">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <span className="header-user">Hi, {user.name}</span>
              <button className="header-logout" onClick={() => setShowConfirm(true)}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>

      {showConfirm && (
        <ConfirmPopUp
          title="Log out?"
          message="Are you sure you want to log out of your account?"
          confirmText="Log out"
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

export default Header;