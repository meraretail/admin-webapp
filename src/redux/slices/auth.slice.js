import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from '../../apis/auth.apis';
import { refreshAccessAndRefreshTokens } from '../../apis/auth.apis';

const initialState = {
  loading: false,
  success: false,
  message: '',
  isAuthenticated: false,
  user: null,
  roles: [],
};

/***************** FUNCTIONS *****************/

// LOGIN
export const login = createAsyncThunk(
  'auth/login',
  async (values, thunkAPI) => {
    try {
      const response = await loginUser(values);
      return response.data;
    } catch (error) {
      const errObj = {
        success: false,
        message: error.response.data.message,
      };
      return thunkAPI.rejectWithValue(errObj);
    }
  }
);

// GET ACCESS TOKEN USING REFRESH TOKEN
export const refreshTokens = createAsyncThunk(
  'auth/refreshTokens',
  async (_, thunkAPI) => {
    try {
      const response = await refreshAccessAndRefreshTokens();
      return response.data;
    } catch (error) {
      console.log('data', error.response.data);
      const errObj = {
        success: false,
        message: error.response.data.message,
      };
      return thunkAPI.rejectWithValue(errObj);
    }
  }
);

// LOGOUT FUNCTION
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const response = await logoutUser();
    return response.data;
  } catch (error) {
    const errObj = {
      success: false,
      message: error.response.data.message,
    };
    return thunkAPI.rejectWithValue(errObj);
  }
});

// reducers: synchronous requests
// extraReducers: asynchronous requests
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
    },
    errorFn: (state, action) => {
      state.success = action.payload.success;
      state.message = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
        state.roles = [];
      })
      .addCase(refreshTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.message = action.payload.message;
        state.isAuthenticated = false;
        state.user = null;
        state.roles = [];
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
        state.user = null;
        state.roles = [];
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.roles = [];
      });
  },
});

export const { reset, errorFn } = authSlice.actions;
export default authSlice.reducer;
