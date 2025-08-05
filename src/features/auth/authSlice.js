// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Check localStorage for existing user info. This is how we keep the user logged in on page refresh.
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const initialState = {
  userInfo: userInfo ? userInfo : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // This action will be "dispatched" from our components after a successful login/register
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      // Also save it to localStorage
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    // This action will clear the state and localStorage on logout
    logOut: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;