import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "../services/users-service";
import {changePassword} from "../services/users-service";



export const registerUserThunk = createAsyncThunk(
  'users/registerUser',
  async (user) => {
    const result = {
      errorMessage: '',
      isSuccess: false
    };
    const userNameRes = await service.findUserByName(user.userName);
    if (userNameRes && userNameRes.length === 0) {
      const createRes = await service.createUser(user);
      if (createRes) {
        result.isSuccess = true;
      }
      else {
        result.errorMessage = "Unable to create user at this point. Please try again later! ";
      }
    }
    else {
      result.errorMessage = "User name is not available. Please enter a unique name! ";
    }

    return result;
  }
);

export const loginUserThunk = createAsyncThunk(
  'users/loginUser',
  async (request) => {
    const result = {
      errorMessage: '',
      isSuccess: false
    };
    const userNameRes = await service.findUserByName(request.userName);
    if (userNameRes && userNameRes.length === 0) {
      result.errorMessage = "Cannot find user. Please check the user name! ";
    }
    else {
      if (userNameRes[0] && userNameRes[0].password === request.password) {
        result.isSuccess = true;
      }
      else {
        result.errorMessage = "Wrong password. Please try again! ";
      }
    }

    return result;
  }
);

export const updatePasswordThunk = createAsyncThunk(
  'users/updatePassword',
  async (request) => {
    const result = {
      errorMessage: '',
      isSuccess: false
    };
    const userNameRes = await service.findUserByName(request.userName);
    if (userNameRes && userNameRes.length === 0) {
      result.errorMessage = "Cannot find user. Please check the user name! ";
    }
    else {
      const updateRes = await service.updateUser(request.userName, {password: request.password});
      if (updateRes) {
        result.isSuccess = true;
      }
      else {
        result.errorMessage = "Unable to update password at this point. Please try again later! ";
      }
    }
    return result;
  }
);

export const logoutThunk = createAsyncThunk(
  'logout',
  async () => await service.logout()
)

export const profileThunk = createAsyncThunk(
  'profile',
  async () => await service.profile()
)

export const findUserByIdThunk = createAsyncThunk(
  'findUserById',
  async (uid) => await service.findUserById(uid)
)

export const loginThunk = createAsyncThunk(
  'login',
  async (user) => await service.login(user)
)

export const registerThunk = createAsyncThunk(
  'register',
  async (user) => await service.register(user)
)

export const findAllUsersThunk = createAsyncThunk(
  'findAllUsers',
  async () => await service.findAllUsers()
)

export const changePasswordThunk = createAsyncThunk(
  'changePassword',
  async (user) => await service.changePassword(user)
)