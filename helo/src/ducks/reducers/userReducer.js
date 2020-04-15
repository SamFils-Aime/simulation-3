import axios from 'axios';

const initialState = {
  user_id: null,
  username: null
}

// Actions
const REGISTER = "REGISTER";
const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const SESSION = "SESSION";

// Export Function
export function Register(username, password) {
  const data = axios.post('/auth/register', { username, password });
  return { type: REGISTER, payload: data };
}

export function Login(username, password) {
  const data = axios.post('/auth/login', { username, password });

  return { type: LOGIN, payload: data };
}

export function logout() {
  const data = axios.get('/auth/logout');

  return { type: LOGOUT, payload: data };
}

export function getSession() {
  const data = axios.get('/auth/session');

  return { type: SESSION, payload: data };
}

// Reducer
export default function reducer(state = initialState, action) {
  const { payload } = action;
  switch (action.type) {
    case `${REGISTER}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${REGISTER}_FULFILLED`:
      return {
        ...state,
        user_id: payload.data.user_id,
        username: payload.data.username,
        loading: false
      }

    case `${LOGIN}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${LOGIN}_FULFILLED`:
      return {
        ...state,
        user_id: payload.data.user_id,
        username: payload.data.username,
        loading: false
      }
    case `${LOGIN}_REJECTED`:
      console.log("Rejected logged In!");
      return {
        ...state,
        loading: false
      }

    case `${LOGOUT}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${LOGOUT}_FULFILLED`:
      return {
        ...state,
        user_id: null,
        username: null,
        loading: false
      }

    case `${SESSION}_PENDING`:
      return {
        ...state,
        loading: true
      }
    case `${SESSION}_FULFILLED`:
      return {
        ...state,
        user_id: payload.data.user_id,
        username: payload.data.username,
        loading: false
      }

    default: return state
  }
}
