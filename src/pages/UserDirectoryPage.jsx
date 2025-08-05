// src/pages/UserDirectoryPage.jsx
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from '../features/api/apiSlice';
import Spinner from '../components/Spinner';
import React from 'react';

function UserDirectoryPage() {
  const { data: users, isLoading, isSuccess } = useGetUsersQuery();

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-primary mb-8">User Directory</h1>
      {isLoading && <Spinner />}
      {isSuccess && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user) => (
            <Link to={`/users/${user._id}`} key={user._id} className="card bg-base-200 shadow-xl hover:bg-base-300">
              <div className="card-body items-center text-center">
                <div className="avatar placeholder mb-4">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <h2 className="card-title">{user.name}</h2>
                <div className="badge badge-secondary">{user.role}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
export default UserDirectoryPage;