import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from '../actions/types';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return { ...state, loading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case ADD_USER_SUCCESS:
      return { ...state, users: [...state.users, action.payload] };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(u => u.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
