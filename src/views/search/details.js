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
            <h1>{details.name}</h1>
            <div className="row">
                <div className="col">
                </div>
                <div className="col">
                </div>
            </div>
            {
                currentUser &&
                <div>
                    <textarea
                        onChange={(e) => setReview(e.target.value)}
                        className="form-control"></textarea>
                    <button onClick={handlePostReviewBtn}>Post Review</button>
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
            <pre>
                {JSON.stringify(details, null, 2)}
            </pre>
        </>
    )
}
export default Details