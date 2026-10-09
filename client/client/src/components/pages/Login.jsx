import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService';
import { getErrorMessage } from '../../services/api';
import Loading from '../loading/Loading';
import SuccessPopUp from '../modal/SuccessPopUp';
import FailedPopUp from '../modal/FailedPopUp';
import '../styles/Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [failedMessage, setFailedMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      setLoggedUser(user);
    } catch (error) {
      setFailedMessage(getErrorMessage(error, 'Login failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    onLogin(loggedUser);
    setLoggedUser(null);
    navigate('/');
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
      <p className="login-link">
        Don't have an account? <Link to="/register">Register here</Link>
      </p>

      {loading && <Loading message="Logging in..." overlay />}

      {loggedUser && (
        <SuccessPopUp
          title="Login Successful"
          message={`Welcome, ${loggedUser.name}!`}
          onClose={handleSuccessClose}
        />
      )}

      {failedMessage && (
        <FailedPopUp
          title="Login Failed"
          message={failedMessage}
          onClose={() => setFailedMessage('')}
        />
      )}
    </div>
  );
}

export default Login;