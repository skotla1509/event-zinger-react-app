import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findEventsBySearchTermThunk} from "../../thunks/search-thunks";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('Music');
  const {events, loading} = useSelector((state) => state.search);
  const dispatch = useDispatch();
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
              <li key={event.imdbID} className="list-group-item">
                <i className="float-end bi bi-hand-thumbs-up"></i>
                <i className="float-end bi bi-hand-thumbs-down me-2"></i>
                <Link to={`/details/${event.imdbID}`}>
                  {event.name}
                </Link>
              </li>
          )
        }
      </ul>
      <pre>
                {JSON.stringify(events, null, 2)}
      </pre>
    </>
  )
}

export default Search