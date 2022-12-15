import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './index.css';
import {findAllEventsThunk} from "../../thunks/events-thunks";

const Home = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(findAllEventsThunk());
  },[]);

    return(
        <>
          <div className="row mt-4 mb-4">
            <div className="col-12 text-center">
              {
                currentUser &&
                <h1 style={{color: "rgb(144,78,186)"}}>Welcome Back, {`${currentUser.firstName}`}!!!</h1>
              }
              {
                !currentUser &&
                <h1 style={{color: "rgb(144,78,186)"}}>Hey there... visitor!!!</h1>
              }
              <h3 className="text-secondary">Let's Make it Happen</h3>
              <div className="text-dark mt-4">
                Checkout millions of live events and discover can't-miss concerts, games, theater and more.
              </div>
            </div>
          </div>
        </>
    );
}

export default Home;