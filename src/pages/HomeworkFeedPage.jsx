// src/pages/HomeworkFeedPage.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetHomeworksQuery } from '../features/api/apiSlice';
import HomeworkCard from '../components/HomeworkCard';
import Spinner from '../components/Spinner';
import React from 'react';

function HomeworkFeedPage() {
  const { data: homeworks, isLoading, isSuccess, isError, error } = useGetHomeworksQuery();
  const { userInfo } = useSelector(state => state.auth);

  let content;

  if (isLoading) {
    content = <div className="flex justify-center items-center h-64"><Spinner /></div>;
  } else if (isSuccess) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {homeworks.map((hw) => (
          <HomeworkCard key={hw._id} homework={hw} />
        ))}
      </div>
    );
  } else if (isError) {
    content = <div className="text-error text-center">{error.toString()}</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-secondary">Homework Submissions</h1>
        {/* --- Frontend Authorization for Students --- */}
        {userInfo && userInfo.role === 'student' && (
          <Link to="/homework/create" className="btn btn-primary">
            Post New Homework
          </Link>
        )}
      </div>
      {content}
    </div>
  );
}

export default HomeworkFeedPage;