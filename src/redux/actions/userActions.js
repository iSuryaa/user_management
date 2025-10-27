import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  ADD_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
} from './types';
import {
  loginApi,
  getUsersApi,
  createUserApi,
  updateUserApi,
  deleteUserApi,
} from '../../api/userApi';

/* =========================================================
   LOGIN
========================================================= */
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const { data } = await loginApi(credentials);
    localStorage.setItem('token', data.token);
    dispatch({ type: LOGIN_SUCCESS, payload: data.token });
    return { success: true };
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      error: error.response?.data?.error || 'Login failed',
    });
    return { success: false };
  }
};

/* =========================================================
   FETCH USERS
========================================================= */
export const fetchUsersAction = (page = 1) => async (dispatch) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const { data } = await getUsersApi(page);
    dispatch({ type: FETCH_USERS_SUCCESS, payload: data.data });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      error: error.response?.data?.error || 'Failed to load users',
    });
  }
};

/* =========================================================
   CREATE USER
========================================================= */
export const addUserAction = (user) => async (dispatch) => {
  try {
    const { data } = await createUserApi(user);
    // Reqres API returns mock data with id
    const newUser = {
      ...user,
      id: data.id || Date.now(),
      avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };
    dispatch({ type: ADD_USER_SUCCESS, payload: newUser });
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

/* =========================================================
   UPDATE USER
========================================================= */
export const updateUserAction = (id, user) => async (dispatch) => {
  try {
    const { data } = await updateUserApi(id, user);
    const updatedUser = { ...user, id, ...data };
    dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser });
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

/* =========================================================
   DELETE USER
========================================================= */
export const deleteUserAction = (id) => async (dispatch) => {
  try {
    await deleteUserApi(id);
    dispatch({ type: DELETE_USER_SUCCESS, payload: id });
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};
