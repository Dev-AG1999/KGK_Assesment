

"use client";

import { useEffect, useState } from 'react';
import { usePost } from '../../../../libs/context/PostContext';
import { useRouter } from 'next/navigation';

export default function CreatePost() {
  const { state, dispatch } = usePost();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    const storedPost = localStorage.getItem('post');
 if (state.post || storedPost) {
  const parsedPost = JSON.parse(storedPost);
  console.log("line 19",parsedPost,state.post);
  
if(state.post){
  setTitle(parsedPost.title ||  '');
  setContent(parsedPost.content || '');
}
    }
  }, [state.post]);


  

  const handleSubmit = async () => {
    let data;
    data = {
      id: state.post.id,
      title: title,
      content: content
    }
    await fetch('/api/posts/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    router.replace("/")

    
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-center mb-6">{state.post.id ? "Edit Post" : "Create Post"}</h1>
      <div className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows="6"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="w-full mt-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Save
      </button>
    </div>
  );
}
