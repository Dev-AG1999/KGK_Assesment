
"use client";

import { useEffect } from "react";
import { usePost } from "../../libs/context/PostContext";
import { ActionTypes } from "../../libs/ActoinTypes/actionTypes";
import { useRouter } from "next/navigation";
import PostEntity from "../../libs/Entity/PostEntity";


export default function PostList() {
  const { state, dispatch } = usePost();
  const router = useRouter();
  const postRoute = "/pages/posts";

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      state.postList = result?.data;

      dispatch({
        type: ActionTypes.SET_POST_LIST,
        payload: state.postList,
      });
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch("/api/posts/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
    } catch (error) {
      console.log("Failed to delete post:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Posts</h1>
      
      <button
        onClick={() => {
          state.post = new PostEntity();
          dispatch({
            type: ActionTypes.SET_POST,
            payload: state.post,
          });
          router.push(postRoute);
        }}
        className="mb-4 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add Post
      </button>
      
      <div className="grid gap-6">
        {state.postList?.map((p) => (
          <div key={p.id} className="p-6 bg-white rounded-lg shadow-md flex items-center justify-between">
            <div
              onClick={() => {
                state.post = p;
                dispatch({
                  type: ActionTypes.SET_POST,
                  payload: state.post,
                });
                localStorage.setItem('post', JSON.stringify(p));
                router.push(`${postRoute}/${p.slug}`);
              }}
              className="cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-gray-800 hover:underline capitalize">{p.title}</h2>
              <p className="text-gray-600 mt-1">{p.content}</p>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-500 hover:text-red-600 transition"
            >
              ✖️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
