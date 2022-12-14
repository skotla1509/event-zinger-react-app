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
import Details from "./search/details";
import usersReducer from "../reducers/users-reducer";
import searchReducer from "../reducers/search-reducer";
import commentsReducer from "../reducers/comments-reducer";
import interestsReducer from "../reducers/people-interested-reducer";
import eventsReducer from "../reducers/events-reducer";
import ViewProfile from "./profile/view-profile";
import EditProfile from "./profile/edit-profile";

const store = configureStore(
  {
    reducer: {
      users: usersReducer,
      search: searchReducer,
      allEvents: eventsReducer,
      comments: commentsReducer,
      interests: interestsReducer
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
              <Route path="/profile/:userId" element={<ViewProfile/>}/>
              <Route path="/edit-profile/:userId" element={<EditProfile/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/details/:eventId" element={<Details/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
            </Routes>
      </CurrentUser>
    </BrowserRouter>
    </Provider>
  );
}

export default Tuiter;