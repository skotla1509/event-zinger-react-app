import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import './index.css';
import {Card, Button} from 'react-bootstrap';
import {setSearchTerm} from "../../reducers/search-reducer";
import {useNavigate} from "react-router-dom";
import {findAllTransactionsByUserThunk} from "../../thunks/tickets-thunks";
import {profileThunk} from "../../thunks/users-thunks";


const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useSelector((state) => state.users);
  const {transactions} = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(profileThunk());
    if (currentUser) {
      dispatch(findAllTransactionsByUserThunk(currentUser._id));
    }
  },[]);

  const redirectToSearch = (searchTerm) => {
    dispatch(setSearchTerm(searchTerm));
    navigate("/search");
  }

  const redirectToEvent = (eventId) => {
    navigate("/details/" + eventId);
  }

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
          {
            currentUser && transactions && transactions.length > 0 &&
            <div className="row m-4">
              <h4 className="mb-2">Recent activity</h4>
              {
                transactions.map(
                  (item, index) => {
                    if (item.event && index < 5) {
                      return (
                        <div id={"activity" + index} className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
                          <Card>
                            <Card.Img id={"activity-image" + index} variant="top" src={item.event.img}/>
                            <Card.Body id={"activity-card" + index}>
                              <Button variant=""
                                      id={"activity-button" + index}
                                      onClick={() => {
                                        if (item.event) {
                                          redirectToEvent(item.event.eventId)
                                        }
                                      }}>
                                <h5>{item.event.name}</h5>
                                <div>
                                  <span>{item.type === "BUY" ? "You bought" : "You sold"} </span>
                                  <i>"{item.tickets} tickets"</i>
                                </div>
                              </Button>
                            </Card.Body>
                          </Card>
                        </div>
                      )
                    }
                  }
                )
              }
            </div>
          }
          <div className="row m-4">
            <h4 className="mb-2">Browse by category</h4>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/concert.png" />
                <Card.Body>
                  <Button variant="" onClick={() => redirectToSearch("Concerts")}>
                    <h5>Concerts</h5>
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/sports1.png" />
                <Card.Body>
                  <Button variant="" onClick={() => redirectToSearch("Sports")}>
                    <h5>Sports</h5>
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/arts.png" />
                <Card.Body>
                  <Button variant="" onClick={() => redirectToSearch("Theatre")}>
                    <h5>Arts & Theatre</h5>
                  </Button>
                </Card.Body>
              </Card>
            </div>
            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3">
              <Card>
                <Card.Img variant="top" src="../../images/family3.png" />
                <Card.Body>
                  <Button variant="" onClick={() => redirectToSearch("Family")}>
                    <h5>Family</h5>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
    );
}

export default Home;