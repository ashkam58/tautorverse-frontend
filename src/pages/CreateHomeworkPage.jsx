// src/pages/CreateHomeworkPage.jsx


import React, { use } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateHomeworkMutation } from '../features/api/apiSlice';
import Spinner from '../components/Spinner';
import { useSelector } from 'react-redux';

function CreateHomeworkPage() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    description: '',
  });
  const { title, subject, description } = formData;

  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.userInfo?.token);
  console.log("token?", token);
  
  // Use the mutation hook we created for homework
  const [createHomework, { isLoading, error }] = useCreateHomeworkMutation();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Simple validation
    if (!title || !subject) {
      alert('Please fill out the title and subject.');
      return;
    }
    try {
      await createHomework({ title, subject, description }).unwrap();
      // On success, navigate back to the homework feed
      navigate('/homework');
    } catch (err) {
      alert(err.data?.message || 'Failed to create homework submission');
      console.error('Failed to create homework: ', err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-secondary mb-8">Submit Your Homework</h1>
      <div className="card w-full bg-base-200 shadow-xl">
        <form className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label"><span className="label-text">Title</span></label>
            <input type="text" placeholder="e.g., Chapter 5 Math Problems" name="title" value={title} onChange={onChange} className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Subject</span></label>
            <input type="text" placeholder="e.g., Math, History, Science" name="subject" value={subject} onChange={onChange} className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Description (Optional)</span></label>
            <textarea name="description" value={description} onChange={onChange} className="textarea textarea-bordered h-24" placeholder="Any notes or comments for the teacher?"></textarea>
          </div>
          
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Submit for Review</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateHomeworkPage;