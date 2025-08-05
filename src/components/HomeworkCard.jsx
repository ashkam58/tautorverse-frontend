// src/components/ResourceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteResourceMutation } from '/src/features/api/apiSlice';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import clsx from 'clsx';

// Helper icon by type
const getResourceTypeIcon = (type) => {
  switch (type) {
    case 'video':
      return '🎥';
    case 'article':
      return '📰';
    case 'pdf':
      return '📄';
    case 'worksheet':
      return '📝';
    case 'link':
      return '🔗';
    default:
      return '⭐';
  }
};

// Truncate helper (small, can replace with your own utility)
const truncate = (str = '', len = 100) =>
  str.length > len ? str.slice(0, len - 1) + '…' : str;

function HomeWorkCard({ homework, mode = 'normal' /* or "spotlight" for big/banner */ }) {
  const {
    _id,
    title,
    description,
    resourceType,
    postedBy = {},
    link,
    fileUrl,
    imageUrl,
    tags = [],
  } = homework;

  const { userInfo } = useSelector((state) => state.auth);
  const [deleteResource, { isLoading: isDeleting }] = useDeleteResourceMutation();

  const isOwner = userInfo && userInfo._id === postedBy._id;

  const handleDelete = async () => {
    if (!window.confirm('Delete this resource? (It’s gone for real)')) return;
    try {
      await deleteResource(_id).unwrap();
      // You probably want a toast instead of alert in production
      alert('🗑️ Resource deleted.');
    } catch (err) {
      alert('⚠️ Failed to delete: ' + (err.data?.message || err.error || 'unknown'));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={clsx(
        'relative flex flex-col bg-white rounded-2xl shadow-2xl overflow-hidden border-2',
        mode === 'spotlight'
          ? 'border-dashed border-indigo-400'
          : 'border-black/10',
        'group'
      )}
    >
      {/* Top sticker row */}
      <div className="absolute top-3 left-3 flex gap-2 z-10">
        <div className="px-2 py-1 bg-gradient-to-r from-yellow-300 to-orange-400 text-[10px] font-bold rounded-full shadow-sm tracking-tight flex items-center gap-1">
          <span className="mr-1">🔥 Hot</span>
        </div>
        {tags.map((t) => (
          <div
            key={t}
            className="px-2 py-1 bg-teal-100 text-[9px] font-semibold rounded-full shadow-inner"
          >
            {t}
          </div>
        ))}
      </div>

      {/* Optional image / visual header */}
      <div
        className={clsx(
          'h-36 w-full overflow-hidden flex-shrink-0',
          imageUrl ? '' : 'bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center'
        )}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title || 'resource image'}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="text-purple-700 italic font-semibold text-center px-4">
            No image? No problem. Big ideas inside!
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h2 className="text-2xl font-extrabold tracking-tight leading-snug flex items-center gap-2">
              <span className="text-[1.3em]">{getResourceTypeIcon(resourceType)}</span>
              <span className="relative">
                <span className="text-primary">{title || 'Untitled Magic'}</span>
                {/* little comic speech bubble shadow */}
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-sm blur-sm opacity-60" />
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-end gap-1 text-right">
            <div className="text-xs uppercase font-bold text-indigo-600 tracking-wider">
              {resourceType || 'resource'}
            </div>
            <div className="text-[10px] px-2 py-1 bg-yellow-200 rounded-full font-semibold flex items-center gap-1 shadow-inner">
              {getResourceTypeIcon(resourceType)}
              <span>{resourceType || 'General'}</span>
            </div>
          </div>
        </div>

        <p className="mt-3 flex-grow text-sm text-gray-800">
          {truncate(description, mode === 'spotlight' ? 160 : 120)}
        </p>

        <div className="mt-4 flex flex-wrap justify-between items-center gap-2">
          <div className="text-xs font-semibold">
            Posted by:{' '}
            <span className="text-pink-500">{postedBy?.name || 'Unknown Creator'}</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            {(link || fileUrl) && (
              <a
                href={link || fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-full shadow hover:scale-105 transition"
              >
                View
              </a>
            )}

            {isOwner && (
              <>
                <Link
                  to={`/resources/edit/${_id}`}
                  className="px-3 py-2 border border-blue-500 text-blue-600 font-medium rounded-full text-xs hover:bg-blue-50 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-3 py-2 border border-red-500 text-red-600 font-medium rounded-full text-xs hover:bg-red-50 transition flex items-center gap-1"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Footer playful tag */}
        <div className="mt-3 flex justify-between items-center text-[10px]">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center text-white text-[10px]">
              💡
            </div>
            <div className="italic">Shared with love</div>
          </div>
          <div className="text-gray-400">#{_id?.slice(-4)}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default HomeWorkCard;
