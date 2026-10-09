import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/authService';
import { getErrorMessage } from '../../services/api';
import Loading from '../loading/Loading';
import SuccessPopUp from '../modal/SuccessPopUp';
import FailedPopUp from '../modal/FailedPopUp';
import '../styles/Login.css';

const initialForm = {
  name: '',
  email: '',
  contact: '',
  program: '',
  yearLevel: '1st Year',
  password: '',
  confirmPassword: '',
};

function Register() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [failedMessage, setFailedMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password.length < 6) {
      setFailedMessage('Password must be at least 6 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setFailedMessage('Passwords do not match.');
      return;
    }

    const userData = {
      name: form.name,
      email: form.email,
      contact: form.contact,
      program: form.program,
      yearLevel: form.yearLevel,
      password: form.password,
    };

    setLoading(true);
    try {
      await registerUser(userData);
      setRegistered(true);
    } catch (error) {
      setFailedMessage(getErrorMessage(error, 'Registration failed. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setRegistered(false);
    navigate('/login');
  };

  return (
    <div className="login">
      <h2>Create Account</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact number"
          value={form.contact}
          onChange={handleChange}
        />
        <input
          name="program"
          placeholder="Program (e.g. BS in Computer Science)"
          value={form.program}
          onChange={handleChange}
        />
        <select name="yearLevel" value={form.yearLevel} onChange={handleChange}>
          <option>1st Year</option>
          <option>2nd Year</option>
          <option>3rd Year</option>
          <option>4th Year</option>
        </select>
        <input
          name="password"
          type="password"
          placeholder="Password (min. 6 characters)"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>

      {loading && <Loading message="Creating your account..." overlay />}

      {registered && (
        <SuccessPopUp
          title="Registration Successful"
          message="Your account has been created. You can now log in."
          onClose={handleSuccessClose}
        />
      )}

      {failedMessage && (
        <FailedPopUp
          title="Registration Failed"
          message={failedMessage}
          onClose={() => setFailedMessage('')}
        />
      )}
    </div>
  );
}

export default Register;