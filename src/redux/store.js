import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// not useful as accesstoken is in cookies
export const getAccessTokenFromState = store.getState().auth.accessToken;
