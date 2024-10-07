import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, provider } from '../components/firebase';
import { useNavigate, Link } from 'react-router-dom'; // Import Link
import { signInWithPopup } from 'firebase/auth';
import '../pages/Login.css';

const LoginForm = ({ user, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleSignWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      Navigate('/', { replace: true });
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      Navigate('/');
      setUser(email);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        <button
          style={{ margin: '10px' }}
          onClick={handleSignWithGoogle}
          type="button"
          className="login-with-google-btn"
        >
          Sign in with Google
        </button>
        <Link to="/auth/register" style={{ textDecoration: "none !important", color:"black"}}>Register</Link> 
      </div>
    </div>
  );
};

export default LoginForm;
