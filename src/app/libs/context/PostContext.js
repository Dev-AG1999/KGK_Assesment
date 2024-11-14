"use client";

import React, { createContext, useReducer, useContext } from "react";
import { ActionTypes } from "../ActoinTypes/actionTypes";
import PostEntity from "../Entity/PostEntity";

// Define the default state with an instance of PostEntity
const defaultState = {
  postList: [],
  post: new PostEntity(),
  isLoading : false // Initialize with default values in PostEntity
};

// Define your reducer function
function genReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_POST_LIST:
      return { ...state, postList: action.payload };
    case ActionTypes.SET_POST:
      return { ...state, post: action.payload };
      case ActionTypes.SET_IS_LOADING:
        return { ...state, isLoading: action.payload };
    default:
      return state;
  }
}

// Create a context
const PostContext = createContext({
  state: defaultState,
  dispatch: () => null
});

// Create a provider component
export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(genReducer, defaultState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
}

// Create a custom hook to use the context
export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("useAuth must be used within a PostProvider");
  }
  return context;
}
