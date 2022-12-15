import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findEventDetailsByIdThunk} from "../../thunks/search-thunks";
import {addCommentThunk, findCommentsByEventIdThunk} from "../../thunks/comments-thunks";
import {
	findInterestsByEventIdThunk,
	markInterestedThunk
} from "../../thunks/people-interested-thunks";
import {Helper} from "../../constants/constants";
import {profileThunk} from "../../thunks/users-thunks";

const Details = () => {
	const {eventId} = useParams()
	const [comment, setReview] = useState('')
	const {comments} = useSelector((state) => state.comments);
	const {interestedUsers} = useSelector((state) => state.interests);
	const {details} = useSelector((state) => state.search)
	const {currentUser} = useSelector((state) => state.users)
	const dispatch = useDispatch();
	useEffect(() => {
		console.log("USEEEEEEEEEEEEEEEEEE");
		dispatch(profileThunk())
		dispatch(findEventDetailsByIdThunk(eventId))
		dispatch(findCommentsByEventIdThunk(eventId))
		dispatch(findInterestsByEventIdThunk(eventId))
	}, []);

	let isCurrentUserInterested = false;
	if (interestedUsers.find((item) => item.user._id === currentUser._id)) {
		isCurrentUserInterested = true;
	}

	const handlePostReviewBtn = async () => {
		await dispatch(addCommentThunk(
			{
				comment,
				event: {
					eventId: details.id,
					name: details.name,
					img: details.img
				}
			}
		));
		dispatch(findCommentsByEventIdThunk(eventId))
	}

	const handleMarkInterested = async () => {
		await dispatch(markInterestedThunk(
			{
				event: {
					eventId: details.id,
					name: details.name,
					img: details.img
				}
			}
		));
		dispatch(findInterestsByEventIdThunk(eventId))
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
					<img src={details.img} className="card-img-top rounded" height="350px" width="200px"
							 alt=""/>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
					<div className="row d-flex flex-column">
						<div className="col mt-2">
							<div style={{color: "rgb(144,78,186)"}}>
								<h2><strong>{details.name}</strong></h2>
							</div>
						</div>
						<div className="col mt-4">
							<div className="row">
								<div className="col-auto">
									<FontAwesomeIcon icon="fa-solid fa-location-dot" className="font-size-20px pt-1"/>
								</div>
								<div className="col">
									<div>
										<strong>Venue</strong>
									</div>
									<div>
										<span>{details.address}</span>
									</div>
									<div>
										<span>{details.city}, {details.state}</span>
									</div>
								</div>
							</div>
						</div>
						<div className="col mt-4">
							<div className="row">
								<div className="col-auto">
									<FontAwesomeIcon icon="fa-solid fa-calendar-days"
																	 className="font-size-20px pt-1"/>
								</div>
								<div className="col">
									<div>
										<strong>When</strong>
									</div>
									<div>
										<span>{Helper.formatDate(details.date)}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					{
						currentUser &&
						<div className="row d-flex flex-column">
							<div className="col mt-4">
								<div className="row">
									{
										isCurrentUserInterested &&
										<>
											<div className="col-auto">
												<FontAwesomeIcon icon="fa-solid fa-star"
																				 className="text-warning font-size-20px"/>
											</div>
											<div className="col">
												<span>Marked interested</span>
											</div>
										</>
									}
									{
										!isCurrentUserInterested &&
										<>
											<div className="col-auto">
												<FontAwesomeIcon icon="fa-solid fa-star" onClick={handleMarkInterested}
																				 className="font-size-20px"/>
											</div>
											<div className="col">
												<span>Mark as interested</span>
											</div>
										</>
									}
								</div>
							</div>
							<div className="col mt-4">
								<span>
									<button type="button"
													style={{backgroundColor: "rgb(144,78,186)"}}
													className="btn m-2 w-25 rounded-pill text-white">
										See tickets</button>
								</span>
							</div>
						</div>
					}
				</div>
			</div>
			<div className="mt-4 row border-secondary border-2 border-top"></div>
			<div className="row align-items-start">
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>People interested</h4>
					<ul className="list-group">
						{
							interestedUsers.map(
								(item, index) =>
									<li className="list-group-item" key={"interested-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.user.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col-7">
												<div>
													<Link to={`/profile/${item.user._id}`} className="text-dark">
														<strong>{item.user.firstName + " " + item.user.lastName}</strong>
													</Link>
												</div>
												<div>
													<i>@{item.user.userName}</i>
												</div>
											</div>
											<div className="col">
												<Link to={`/profile/${item.user._id}`} className="float-end">
													View
												</Link>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>People attended</h4>
					<ul className="list-group">
						<li>Attending 1</li>
						<li>Attending 2</li>
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Comments</h4>
					{
						currentUser &&
						<>
							<div className="mt-2 row">

								{
									currentUser &&
									<div className="row mt-2 mb-2">
										<div className="col-10">
                        <textarea
													onChange={(e) => setReview(e.target.value)}
													placeholder="Write new comment"
													className="form-control">
                        </textarea>
										</div>
										<div className="col-2">
											<button className="btn btn-primary rounded"
															onClick={handlePostReviewBtn}>Post
											</button>
										</div>
									</div>

								}
							</div>
						</>
					}
					<ul className="list-group">
						{
							comments.map(
								(item, index) =>
									<li className="list-group-item" key={"comments-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.user.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.user._id}`} className="text-dark">
														<strong>{item.user.firstName + " " + item.user.lastName}</strong>
													</Link>
													<i className="px-2">@{item.user.userName}</i>
												</div>
												<div>
													<i>Says </i>
													"{item.comment}"
												</div>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}
export default Details