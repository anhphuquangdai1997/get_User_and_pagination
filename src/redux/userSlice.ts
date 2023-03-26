import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers } from '../service/api/user';

interface UserState {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

export const getUserList = createAsyncThunk(
  'user/getUserList',
  async (page: number) => {
    const response = await getUsers(page);
    return response;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to get user list.';
      });
  },
});

export const { setCurrentPage } = userSlice.actions;
export default userSlice.reducer;
