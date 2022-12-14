import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {findMoviesLikedByUserThunk} from "../../thunks/likes-thunks";

const PeopleInterested = ({uid, eventId}) => {
    // const {likes} = useSelector((state) => state.likes)
    const likes = [uid]
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(findMoviesLikedByUserThunk(uid))
    }, [])
    return(
        <>
            <h2>People interested</h2>
            <div className="list-group">
                {
                    likes.map((like) =>
                        <div>
                            <pre>
                                {JSON.stringify(like, null, 2)}
                            </pre>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default PeopleInterested