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
          <div className="row">
            <div className="col">
              <Card>
                <Card.Img variant="top" src="../../images/banner.jpg" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae molestie magna. Vivamus sed molestie enim, eu convallis mauris. Aliquam pharetra velit ac enim maximus, a commodo augue hendrerit. Phasellus at aliquam est
                  </Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col">
              <Card>
                <Card.Img variant="top" src="../../images/banner.jpg" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae molestie magna. Vivamus sed molestie enim, eu convallis mauris. Aliquam pharetra velit ac enim maximus, a commodo augue hendrerit. Phasellus at aliquam est
                  </Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col">
              <Card>
                <Card.Img variant="top" src="../../images/banner.jpg" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae molestie magna. Vivamus sed molestie enim, eu convallis mauris. Aliquam pharetra velit ac enim maximus, a commodo augue hendrerit. Phasellus at aliquam est
                  </Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col">
              <Card>
                <Card.Img variant="top" src="../../images/banner.jpg" />
                <Card.Body>
                  <Card.Title>Card Title</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vitae molestie magna. Vivamus sed molestie enim, eu convallis mauris. Aliquam pharetra velit ac enim maximus, a commodo augue hendrerit. Phasellus at aliquam est
                  </Card.Text>
                  <Button variant="primary">Read More</Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
    );
}

export default Home;