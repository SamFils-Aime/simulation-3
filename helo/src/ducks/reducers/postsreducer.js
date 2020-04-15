import axios from 'axios';

const initialState = {
  posts: null
}

const GET_POSTS = "GET_POSTS";

// Export Function
export function getPosts(a) {
  let data;
  if (a) {
    const query = Object.keys(a)[0];
    data = axios(`/api/posts?${query}=${a.title}`);
  } else {
    data = axios('/api/posts');
  }

  return { type: GET_POSTS, payload: data };
}

// Reducers
export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case `${GET_POSTS}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${GET_POSTS}_FULFILLED`:
      return {
        ...state,
        posts: payload.data,
        loading: false
      }

    default: return state;
  }
}