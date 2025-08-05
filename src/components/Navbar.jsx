// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../features/auth/authSlice';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get the user info from the Redux store's auth slice
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    navigate('/login');
  };

  return (
    <div className="navbar bg-neutral text-neutral-content shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-2xl font-extrabold text-primary">
          TUTORVERSE
        </Link>
        {/* Show a link to the shared resource feed if logged in */}
        {userInfo && (
          <>
          <Link to="/resources" className="btn btn-ghost">Resources</Link>
          <Link to="/homework" className="btn btn-ghost">Homework</Link>
          </>
        )}
      </div>
      <div className="flex-none">
        {userInfo ? (
          // If user is logged in, show their name and a dropdown
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {/* A simple placeholder avatar with the user's initial */}
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-neutral-content text-xl font-bold">
                  {userInfo && userInfo.name ? userInfo.name.charAt(0) : "?"}
                </div>
              </div>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 text-base-content rounded-box w-52">
              <li>
                <Link to="/profile" className="justify-between">
                  Welcome, {userInfo.name}!
                  <span className="badge badge-accent">{userInfo.role}</span>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          // If user is logged out, show Login and Sign Up buttons
          <ul className="menu menu-horizontal px-1">
            <li><Link to="/login" className="btn btn-ghost">Login</Link></li>
            <li><Link to="/register" className="btn btn-secondary ml-2">Sign Up</Link></li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Navbar;