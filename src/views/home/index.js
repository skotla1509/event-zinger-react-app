import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {findAllEventsThunk} from "../../thunks/events-thunks";

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(findAllEventsThunk());
  },[]);

    return(
        <>
            <h2>Home</h2>
        </>
    );
}

export default Home;