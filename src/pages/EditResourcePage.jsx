// src/pages/EditResourcePage.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetResourceByIdQuery, useUpdateResourceMutation } from '../features/api/apiSlice';
import Spinner from '../components/Spinner';

function EditResourcePage() {
  const { id } = useParams(); // Get the resource ID from the URL
  const navigate = useNavigate();

  const { data: resource, isLoading: isLoadingResource, isError } = useGetResourceByIdQuery(id);
  const [updateResource, { isLoading: isUpdating }] = useUpdateResourceMutation();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    resourceType: 'video',
  });
  
  // Pre-fill the form once the resource data is fetched
  useEffect(() => {
    if (resource) {
      setFormData({
        title: resource.title,
        description: resource.description,
        link: resource.link || '',
        resourceType: resource.resourceType,
      });
    }
  }, [resource]);
  
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateResource({ id, ...formData }).unwrap();
      navigate('/resources');
    } catch (err) {
      alert('Failed to update resource.');
    }
  };
  
  if (isLoadingResource) return <Spinner />;
  if (isError) return <p className="text-error">Error loading resource.</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">Edit Resource</h1>
      {/* We can reuse the form from CreateResourcePage here for DRY principle, but for clarity, we'll write it out */}
      <div className="card w-full bg-base-200 shadow-xl">
        <form className="card-body" onSubmit={onSubmit}>
          {/* Form fields identical to CreateResourcePage, but with values bound to formData */}
          <div className="form-control">
            <label className="label"><span className="label-text">Title</span></label>
            <input type="text" name="title" value={formData.title} onChange={onChange} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Description</span></label>
            <textarea name="description" value={formData.description} onChange={onChange} className="textarea textarea-bordered h-24"></textarea>
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Link</span></label>
            <input type="url" name="link" value={formData.link} onChange={onChange} className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label"><span className="label-text">Resource Type</span></label>
            <select name="resourceType" value={formData.resourceType} onChange={onChange} className="select select-bordered w-full">
              <option value="video">Video</option>
              <option value="article">Article</option>
              {/* ... other options */}
            </select>
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary" disabled={isUpdating}>
              {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditResourcePage;