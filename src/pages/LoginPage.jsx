// src/pages/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../features/api/apiSlice';
import { setCredentials } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Use the login mutation hook we created earlier
  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

 const onSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await login({ email, password }).unwrap();
    // Debug: see what came back
    console.log('Login response:', res);

    // Normalize: support a few common shapes
    let payload;
    if (res.token) {
      // shape: { token, name, email, ... }
      payload = res;
    } else if (res.data && res.data.token) {
      // shape: { data: { token, ... } }
      payload = res.data;
    } else if (res.token == null && res.user && res.token) {
      // unlikely but example: { user: {...}, token: '...' }
      payload = { ...res.user, token: res.token };
    } else if (res.user && res.user.token) {
      // shape: { user: { token: '...' , ... } }
      payload = res.user;
    } else {
      // fallback: nothing usable
      throw new Error('Unexpected login response shape');
    }

    dispatch(setCredentials(payload));
    navigate('/');
  } catch (err) {
    console.error('Failed to login: ', err);
    alert(
      err?.data?.message ||
        err?.message ||
        'Login Failed - check console for response shape'
    );
  }
};


  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="hero min-h-screen bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left lg:pl-10">
          <h1 className="text-5xl font-bold text-primary">Welcome Back!</h1>
          <p className="py-6">Ready to dive back into the world of learning? Log in to access your dashboard, resources, and connect with the community.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label"><span className="label-text">Email</span></label>
              <input type="email" placeholder="email" name="email" value={email} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text">Password</span></label>
              <input type="password" placeholder="password" name="password" value={password} onChange={onChange} className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
            <label className="label">
              <Link to="/register" className="label-text-alt link link-hover">Don't have an account? Sign Up</Link>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;