// src/pages/ResourceFeedPage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetResourcesQuery } from '../features/api/apiSlice';
import ResourceCard from '../components/ResourceCard';
import Spinner from '../components/Spinner';

function ResourceFeedPage() {
  // Use the hook to fetch data. RTK Query handles the state management.
  const { 
    data: resources, 
    isLoading, 
    isSuccess, 
    isError, 
    error 
  } = useGetResourcesQuery();

  // Get user info to conditionally show the "Create" button
  const { userInfo } = useSelector(state => state.auth);

  let content;

  if (isLoading) {
    content = <div className="flex justify-center items-center h-64"><Spinner /></div>;
  } else if (isSuccess) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <ResourceCard key={resource._id} resource={resource} />
        ))}
      </div>
    );
  } else if (isError) {
    content = <div className="text-error text-center">{error.toString()}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary">Community Resources</h1>
        {/* --- Authorization on the Frontend --- */}
        {userInfo && userInfo.role === 'teacher' && (
          <Link to="/resources/create" className="btn btn-secondary">
            Post New Resource
          </Link>
        )}
      </div>
      {content}
    </div>
  );
}

export default ResourceFeedPage;