import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {findEventsBySearchTermThunk} from "../../thunks/search-thunks";
import {Helper} from "../../constants/constants";
import {setSearchTerm} from "../../reducers/search-reducer";

const Search = () => {
  const {events, searchTerm, loading} = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(findEventsBySearchTermThunk(searchTerm))
  }, []);

  return (
    <div className="m-4">
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
              dispatch(setSearchTerm(e.target.value))
            }}
            value={searchTerm}/>
        </li>
        {
          events
          && events.map(
            (event) =>
              <li key={event.id} className="list-group-item">
                  <div className="row align-items-center">
                      <div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
                          <img src={event.img} className="card-img-top rounded" height="100px" width="100px" alt=""/>
                      </div>

                      <div className="col-8 col-sm-8 col-md-8 col-lg-2 col-xl-2">
                          <div style={{color: "rgb(144,78,186)"}}>
                              <strong>{Helper.formatDate(event.date)}</strong>
                          </div>
                      </div>

                      <div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6">
                          <Link to={`/details/${event.id}`} className="text-dark">
                              <strong>{event.name}</strong>
                          </Link>
                          <div className="text-secondary">
                              {event.location}
                          </div>
                      </div>
                      <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-2">
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
    </div>
  )
}

export default Search