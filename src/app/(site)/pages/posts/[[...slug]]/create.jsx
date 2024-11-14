"use client";

import { useEffect, useState } from 'react';
import { usePost } from '../../../../libs/context/PostContext';
import { useRouter } from 'next/navigation';
import { ActionTypes } from '../../../../libs/ActoinTypes/actionTypes';

export default function CreatePost() {
  const { state, dispatch } = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [slug, setSlug] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPost = localStorage.getItem('post');
    if (storedPost) {
      const parsedPost = JSON.parse(storedPost);
      dispatch({ type: 'SET_POST', payload: parsedPost });
      setTitle(parsedPost.title || '');
      setContent(parsedPost.content || '');
      setSlug(parsedPost.slug || '');
    }
  }, []);

  const handleSubmit = async () => {
    dispatch({ type: ActionTypes.SET_IS_LOADING, payload: true });

    const data = {
      id: state.post.id,
      title: title,
      content: content,
      slug: slug,
    };

    try {
      const res = await fetch('/api/posts/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false });
        localStorage.setItem('post', JSON.stringify(data)); // Persist in localStorage
        router.replace('/');
      } else {
        throw new Error('Failed to update post');
      }
    } catch (error) {
      dispatch({ type: ActionTypes.SET_IS_LOADING, payload: false });
      alert('An error occurred while saving the post. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">
        {state.post?.id ? 'Edit Post' : 'Create Post'}
      </h1>
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {slug && (
          <input
            type="text"
            name="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {state.isLoading ? (
          <div className="flex justify-center items-center">
            <svg
              className="w-5 h-5 mr-2 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path fill="none" stroke="currentColor" strokeWidth="4" d="M4 12a8 8 0 0 1 16 0" />
            </svg>
            Saving...
          </div>
        ) : (
          'Save'
        )}
      </button>
    </div>
  );
}
