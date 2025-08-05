// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../features/api/apiSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    // This is where we add our reducers.
    // The key 'api' must match the reducerPath from apiSlice.
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, // Enable Redux DevTools in the browser
});