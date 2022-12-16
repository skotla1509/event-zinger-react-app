import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './index.css';
import {findAllEventsThunk} from "../../thunks/events-thunks";
import {Container ,Card, Col, Button} from 'react-bootstrap';


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
          <div className="row m-4">
            <h4 className="mb-2">Browse by category</h4>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/concert.png" />
                <Card.Body>
                  <Card.Title>Concerts</Card.Title>
                  <Button variant="secondary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/sports1.png" />
                <Card.Body>
                  <Card.Title>Sports</Card.Title>
                  <Button variant="secondary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/arts.png" />
                <Card.Body>
                  <Card.Title>Arts and Theatre</Card.Title>
                  <Button variant="secondary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/family3.png" />
                <Card.Body>
                  <Card.Title>Family</Card.Title>
                  <Button variant="secondary">
                    Read More</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
    );
}

export default Home;