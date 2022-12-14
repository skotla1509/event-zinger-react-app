import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findCommentsByUserThunk} from "../../thunks/comments-thunks";
import {findInterestsByUserThunk} from "../../thunks/people-interested-thunks";
import {findUserByIdThunk, profileThunk} from "../../thunks/users-thunks";

const ViewProfile = () => {
	const {userId} = useParams()
	const {comments} = useSelector((state) => state.comments);
	const {interestedEvents} = useSelector((state) => state.interests);
	const {currentUser, publicProfile} = useSelector((state) => state.users)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(profileThunk());
		dispatch(findUserByIdThunk(userId));
		dispatch(findInterestsByUserThunk(userId));
		dispatch(findCommentsByUserThunk(userId));
	}, []);

	let isCurrentUserProfile = false;
	if (publicProfile && currentUser && publicProfile._id === currentUser._id) {
		isCurrentUserProfile = true;
	}

	return (
		<div className="container">
			<div className="row">
				<div className="col-12 col-sm-12 col-md-12 col-lg-5 col-xl-5">
					<img src={"../../images/" + publicProfile.avatar} className="card-img-top rounded" height="350px" width="200px"
							 alt=""/>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-7 col-xl-7">
					<div className="row d-flex flex-column">
						<div className="col mt-2">
							<div style={{color: "rgb(144,78,186)"}}>
								<h2><strong>{publicProfile.userName}</strong></h2>
							</div>
						</div>
						<div className="col mt-4">
							<div className="row">
								<div className="col-auto">
									<FontAwesomeIcon icon="fa-solid fa-location-dot" className="font-size-20px pt-1"/>
								</div>
								<div className="col">
									{publicProfile.firstName}
									{publicProfile.lastName}
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
									{publicProfile.firstName}
									{publicProfile.lastName}
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
										isCurrentUserProfile &&
										<>
											<button type="button"
															style={{backgroundColor: "rgb(144,78,186)"}}
															className="btn m-2 w-25 rounded-pill text-white">
												Edit profile</button>
										</>
									}
								</div>
							</div>
						</div>
					}
				</div>
			</div>
			<div className="mt-4 row border-secondary border-2 border-top"></div>
			<div className="row align-items-start">
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Events interested</h4>
					<ul className="list-group">
						{
							interestedEvents.map(
								(item, index) =>
									<li className="list-group-item" key={"interested-" + item.event._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.event.img}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.event.eventId}`} className="text-dark">
														<strong>{item.event.name}</strong>
													</Link>
												</div>
											</div>
										</div>
									</li>
							)
						}
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Events attended</h4>
					<ul className="list-group">
						<li className="list-group-item">Attending 1</li>
						<li className="list-group-item">Attending 2</li>
					</ul>
				</div>
				<div className="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 mt-4">
					<h4>Comments</h4>
					<ul className="list-group">
						{
							comments.map(
								(item, index) =>
									<li className="list-group-item" key={"comments-" + item.event._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.event.img}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col">
												<div>
													<Link to={`/profile/${item.event.eventId}`} className="text-dark">
														<strong>{item.event.name}</strong>
													</Link>
												</div>
												<div>
													<i>You said </i>
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
export default ViewProfile