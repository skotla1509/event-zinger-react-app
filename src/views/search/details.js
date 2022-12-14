import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {findEventByIdThunk} from "../../thunks/search-thunks";
import {createReviewThunk} from "../../thunks/reviews-thunks";

const Details = () => {
    const {eventId} = useParams()
    const [review, setReview] = useState('')
    const {reviews} = useSelector((state) => state.reviews)
    const interested = []
    const attending = []
    const {details} = useSelector((state) => state.search)
    const {currentUser} = useSelector((state) => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findEventByIdThunk(eventId))
        // dispatch(findReviewsByMovieThunk(eventId))
    },[])
    const handlePostReviewBtn = () => {
        dispatch(createReviewThunk({
            review,
            eventId
        }))
    }
    return(
        <>

            <div className="row">
                <div className="col-3">
                    <img src={details.img} className="card-img-top rounded" height="350px" width="200px" alt=""/>
                </div>
                <div className="col">
                    <div className="row d-flex flex-column">
                        <div className="col">
                            <div style={{color: "rgb(144,78,186)"}}>
                                <h2><strong>{details.name}</strong></h2>
                            </div>
                        </div>
                        <div className="col mt-4">
                            <span>
                                <i className="bi bi-geo-alt-fill"></i>
                                    <strong className="m-2 font-italic">Venue:</strong>
                            </span>
                            <div className="mx-4">
                                {details.address}, {details.city}, {details.state}
                            </div>

                        </div>
                        <div className="col mt-3">
                            <span>
                                <i className="bi bi-calendar2-week-fill"></i>
                                <strong className="m-2">When?</strong>
                                <div className="mx-4">
                                    {details.date}
                                </div>
                            </span>
                        </div>
                        {
                            currentUser &&
                            <div className="col mt-3">

                                <span>
                                    <button type="button"
                                            className="btn btn-info m-2">I'm Interested</button>
                                </span>
                                <span>
                                    <button type="button"
                                            className="btn btn-info m-2">Buy/Sell tickets</button>
                                </span>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div className="row border-bottom">

                {
                    currentUser &&
                    <div className="row m-3">
                        <div className="col-1">
                            <h5 className="ps-10">Reviews:</h5>
                        </div>
                        <div className="col-11">
                        <textarea
                            onChange={(e) => setReview(e.target.value)}
                            className="form-control">

                        </textarea>
                        </div>
                        <div>
                            <button className="btn btn-primary rounded m-3 float-end" onClick={handlePostReviewBtn}>Post</button>
                        </div>
                    </div>

                }
                <ul className="list-group">
                    {
                        reviews.map((review) =>
                                        <li className="list-group-item">
                                            {review.review}
                                            <Link to={`/profile/${review.author._id}`} className="float-end">
                                                {review.author.username}
                                            </Link>
                                        </li>
                        )
                    }
                </ul>
            </div>

                <div className="row align-items-center mt-5">
                    <div className="col-4">
                        <h4>People interested</h4>
                        <ul className="list-group">
                            <li>Interested 1</li>
                            <li>Interested 2</li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <h4>People attended</h4>
                        <ul className="list-group">
                            <li>Attending 1</li>
                            <li>Attending 2</li>
                        </ul>
                    </div>
                    <div className="col-4">
                        <h4>Comments</h4>
                        <ul className="list-group">
                            <li>Comment 1</li>
                            <li>Comment 2</li>
                        </ul>
                    </div>
                </div>


<br/><br/>
            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}
export default Details