import React from 'react';
// src/pages/CreateResourcePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateResourceMutation } from '../features/api/apiSlice';
import Spinner from '../components/Spinner';

function CreateResourcePage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    resourceType: 'video', // Default value
  });
  const { title, description, link, resourceType } = formData;

  const navigate = useNavigate();
  const [createResource, { isLoading, error }] = useCreateResourceMutation();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await createResource({ title, description, link, resourceType }).unwrap();
      // On success, navigate back to the resource feed
      navigate('/resources');
    } catch (err) {
      alert(err.data?.message || 'Failed to create resource');
      console.error('Failed to create resource: ', err);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Post a New Resource</h1>
      <div className="card w-full bg-base-200 shadow-xl">
        <form className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label"><span className="label-text">Title</span></label>
            <input type="text" placeholder="e.g., Intro to Photosynthesis" name="title" value={title} onChange={onChange} className="input input-bordered" required />
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea name="description" value={description} onChange={onChange} className="textarea textarea-bordered h-24" placeholder="What is this resource about?"></textarea>
          </div>

          <div className="form-control">
            <label className="label"><span className="label-text">Link</span></label>
            <input type="url" placeholder="https://example.com/resource" name="link" value={link} onChange={onChange} className="input input-bordered" />
            <label className="label"><span className="label-text-alt">A link to a video, article, etc.</span></label>
          </div>
          
          <div className="form-control">
            <label className="label"><span className="label-text">Resource Type</span></label>
            <select name="resourceType" value={resourceType} onChange={onChange} className="select select-bordered w-full">
              <option value="video">Video</option>
              <option value="article">Article</option>
              <option value="pdf">PDF</option>
              <option value="worksheet">Worksheet</option>
              <option value="link">Other Link</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary">Post Resource</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateResourcePage;