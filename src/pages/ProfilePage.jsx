// src/pages/ProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 font-cartoon">
        <p className="text-lg text-purple-600 animate-pulse">🌀 Loading your cartoon identity...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gradient-to-br from-pink-100 to-yellow-100 min-h-screen font-cartoon">
      <h1 className="text-4xl font-bold text-center text-purple-700 mb-6 animate-bounce">
        🎉 Welcome to Your Tooniverse, {userInfo.name}!
      </h1>
      <div className="card bg-white shadow-xl border-4 border-dashed border-purple-300 rounded-xl p-4">
        <div className="card-body space-y-4">
          <p className="text-lg text-gray-700">
            🧑‍🎓 <strong>Name:</strong> <span className="text-blue-500">{userInfo.name}</span>
          </p>
          <p className="text-lg text-gray-700">
            📧 <strong>Email:</strong> <span className="text-green-500">{userInfo.email}</span>
          </p>
          <p className="text-lg text-gray-700">
            🏷️ <strong>Role:</strong>{' '}
            <span className="badge badge-accent badge-outline">{userInfo.role}</span>
          </p>
          <p className="text-sm italic text-gray-500">
            ✨ Your profile is powered by rainbow pixels and a dash of daisyUI magic.
          </p>
        </div>
      </div>
      <div className="mt-6 text-center">
        <img
          src="https://placehold.co/400x300/fff0f5/5e3a8e?text=Cartoon+Profile+Zone"
          alt="Cartoon Profile Zone"
          className="rounded-lg shadow-md border-2 border-pink-300"
        />
        <p className="mt-2 text-sm text-gray-600 italic">
          (P.S. Your avatar might be riding a hoverboard made of homework.)
        </p>
      </div>
    </div>
  );
}

export default ProfilePage;
