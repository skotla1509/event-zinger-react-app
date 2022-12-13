import React from "react";
import {Routes, Route} from "react-router";
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import Login from "./login";
import Register from "./register";
import Home from "./home";
import {BrowserRouter} from "react-router-dom";
import CurrentUser from "./current-user";
import Navigation from "./navigation";
import Profile from "./profile";
import Search from "./search";
import usersReducer from "../reducers/users-reducer";
import searchReducer from "../reducers/search-reducer";
import reviewsReducer from "../reducers/reviews-reducer";

const store = configureStore(
  {
    reducer: {
      users: usersReducer,
      search: searchReducer,
      reviews: reviewsReducer
    }
  }
)

function Tuiter() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <CurrentUser>
        <Navigation/>
            <Routes>
              <Route index element={<Home/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
      </CurrentUser>
    </BrowserRouter>
    </Provider>
  );
}

export default Tuiter;