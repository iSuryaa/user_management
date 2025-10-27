import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem('token'),
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload,
        isAuthenticated: true,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    case LOGOUT:
      localStorage.removeItem('token');
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
};

export default authReducer;
