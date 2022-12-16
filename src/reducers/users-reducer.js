import {createSlice} from "@reduxjs/toolkit";
import {
  changePasswordThunk, deleteUserThunk,
  findAllUsersThunk,
  findUserByIdThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk, updateProfileThunk
} from "../thunks/users-thunks";

const usersReducer = createSlice(
  {
    name: 'users',
    initialState: {
      users: [],
      loading: false,
      currentUser: null,
      registerSuccess: false,
      loginSuccess: false,
      passwordChangeSuccess: false,
      updateSuccess: false,
      errorMessage: '',
      publicProfile: {}
    },
    reducers: {
      setErrorMessage(state, action) {
        state.errorMessage = action.payload;
      }
    },
    extraReducers: {
      [findUserByIdThunk.fulfilled]: (state, action) => {
        state.publicProfile = action.payload
      },
      [logoutThunk.fulfilled]: (state, action) => {
        state.currentUser = null;
      },
      [profileThunk.fulfilled]: (state, action) => {
        state.currentUser = action.payload;
      },
      [registerThunk.pending]: (state, action) => {
        state.loading = true;
      },
      [registerThunk.fulfilled]: (state, action) => {
        state.registerSuccess = true;
        state.errorMessage = "";
        state.loading = false;
      },
      [registerThunk.rejected]: (state, action) => {
        state.loading = false;
        state.errorMessage = "User already exists! Please try a different user name."
      },
      [loginThunk.pending]: (state, action) => {
        state.loading = true;
      },
      [loginThunk.fulfilled]: (state, action) => {
        state.currentUser = action.payload;
        state.loginSuccess = true;
        state.errorMessage = "";
        state.loading = false;
      },
      [loginThunk.rejected]: (state, action) => {
        state.loading = false;
        state.errorMessage = "Sorry, we are not able to locate you. Please re-check information.";
      },
      [changePasswordThunk.pending]: (state, action) => {
        state.loading = true;
      },
      [changePasswordThunk.fulfilled]: (state, action) => {
        state.passwordChangeSuccess = true;
        state.errorMessage = "";
        state.loading = false;
      },
      [changePasswordThunk.rejected]: (state, action) => {
        state.loading = false;
        state.errorMessage = "Sorry, we are not able to locate you. Please re-check information.";
      },
      [updateProfileThunk.pending]: (state, action) => {
        state.currentUser = action.payload.updated;
        state.loading = true;
      },
      [updateProfileThunk.fulfilled]: (state, action) => {
        state.updateSuccess = true;
        state.currentUser = action.payload;
        state.errorMessage = "";
        state.loading = false;
      },
      [updateProfileThunk.rejected]: (state, action) => {
        state.loading = false;
        state.errorMessage = "Sorry,something went wrong. Please try again later!.";
      },
      [findAllUsersThunk.fulfilled]: (state, action) => {
        state.users = action.payload
        state.loading = false
      },
      [deleteUserThunk.fulfilled]: (state, action) => {
        state.users = state.users.filter((item) => item._id !== action.payload.deleted);
      }
    }
  }
)

export const {setErrorMessage} = usersReducer.actions;
export default usersReducer.reducer