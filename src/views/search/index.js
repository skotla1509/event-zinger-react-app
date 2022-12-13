import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {findEventsBySearchTermThunk} from "../../thunks/search-thunks";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('Sports');
  const {events, loading} = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(findEventsBySearchTermThunk(searchTerm))
  }, []);

  return (
    <>
      <h1>Event Search</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <button
            className="btn btn-primary float-end"
            onClick={() => {
              dispatch(findEventsBySearchTermThunk(searchTerm))
            }}>Search
          </button>
          <input
            className="form-control w-75"
            onChange={(e) => {
              setSearchTerm(e.target.value)
            }}
            value={searchTerm}/>
        </li>
        {
          events
          && events.map(
            (event) =>
              <li key={event.id} className="list-group-item">
                  <div className="row align-items-center">
                      <div className="col-2">
                          <img src={event.img} className="card-img-top rounded" height="100px" width="100px" alt=""/>
                      </div>

                      <div className="col-2">
                          <div style={{color: "rgb(144,78,186)"}}>
                              <strong>{event.date}</strong>
                          </div>
                      </div>

                      <div className="col-6">
                          <Link to={`/details/${event.id}`} className="text-dark">
                              <strong>{event.name}</strong>
                          </Link>
                          <div className="text-secondary">
                              {event.location}
                          </div>
                      </div>
                      <div className="col-2">
                          <button type="button"
                                  onClick={() => {
                                    navigate(`/details/${event.id}`)
                                  }}
                                  className="float-end btn btn-primary">Details</button>
                      </div>
                  </div>
              </li>
          )
        }
      </ul>
    </>
  )
}

export default Search