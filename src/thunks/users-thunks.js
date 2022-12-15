import {createAsyncThunk} from "@reduxjs/toolkit";
import {
	changePassword,
	findAllUsers,
	findUserById,
	login,
	logout,
	profile,
	register, updateProfile
} from "../services/users-service";

export const logoutThunk = createAsyncThunk(
  'logout',
  async () => await logout()
)

export const profileThunk = createAsyncThunk(
  'profile',
  async () => await profile()
)

export const findUserByIdThunk = createAsyncThunk(
  'findUserById',
  async (uid) => {
		return await findUserById(uid)
	}
)

export const loginThunk = createAsyncThunk(
  'login',
  async (user) => await login(user)
)

export const registerThunk = createAsyncThunk(
  'register',
  async (user) => await register(user)
)

export const findAllUsersThunk = createAsyncThunk(
  'findAllUsers',
  async () => await findAllUsers()
)

export const changePasswordThunk = createAsyncThunk(
  'changePassword',
  async (user) => await changePassword(user)
)

export const updateProfileThunk = createAsyncThunk(
	'updateProfile',
	async (updatesObj) => await updateProfile(updatesObj)
)