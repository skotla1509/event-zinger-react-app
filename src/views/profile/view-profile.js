import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
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
  const navigate = useNavigate();
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
			<div className="row mt-4">
				<div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
					<div>
						<img src={"../../images/" + publicProfile.avatar} className="rounded-circle" width="100%"
								 alt=""/>
					</div>
					<div className="pt-2 text-center">
						<h4 className="text-secondary">@{publicProfile.userName}</h4>
						<div>
							<FontAwesomeIcon icon="fa-solid fa-calendar-days"
															 className="pt-1"/>
							<span className="px-2">Joined on</span>
						</div>
					</div>

				</div>
				<div className="col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10">
					<div className="row d-flex flex-column">
						<div className="col mt-2">
							<div style={{color: "rgb(144,78,186)"}}>
								<h2><strong>{publicProfile.firstName} {publicProfile.lastName}</strong></h2>
							</div>
						</div>
						<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
							<ul className="list-group list-group-flush">
								<li className="list-group-item d-flex justify-content-between align-items-center">
									{
										isCurrentUserProfile &&
										<span>
												<FontAwesomeIcon icon="fa-solid fa-star"
																				 style={{width: "20px"}}
																				 className="text-warning px-2" />
												Events you marked as interested
										</span>
									}
									{
										!isCurrentUserProfile &&
										<span>
												<FontAwesomeIcon icon="fa-solid fa-star"
																				 style={{width: "20px"}}
																				 className="text-warning px-2" />
												Events marked as interested
										</span>
									}
									<span className="badge badge-primary badge-pill bg-primary">
											{
												interestedEvents.length
											}
										</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									{
										isCurrentUserProfile &&
										<span>
											<FontAwesomeIcon icon="fa-solid fa-clipboard-user"
																			 style={{width: "20px"}}
																			 className="text-primary px-2" />
											Events you attended
										</span>
									}
									{
										!isCurrentUserProfile &&
										<span>
												<FontAwesomeIcon icon="fa-solid fa-clipboard-user"
																				 style={{width: "20px"}}
																				 className="text-primary px-2" />
												Events attended
										</span>
									}
									<span className="badge badge-primary badge-pill bg-primary">
											{
												0
											}
										</span>
								</li>
								<li className="list-group-item d-flex justify-content-between align-items-center">
									{
										isCurrentUserProfile &&
										<span>
											<FontAwesomeIcon icon="fa-solid fa-clock-rotate-left"
																			 style={{width: "20px"}}
																			 className="text-info px-2"/>
												Your recent activity
										</span>
									}
									{
										!isCurrentUserProfile &&
										<span>
											<FontAwesomeIcon icon="fa-solid fa-clock-rotate-left"
																			 style={{width: "20px"}}
																			 className="text-info px-2"/>
												Recent activity
										</span>
									}
									<span className="badge badge-primary badge-pill bg-primary">
											{
												comments.length
											}
										</span>
								</li>
							</ul>
						</div>
					</div>
					{
						currentUser &&
						<div className="row d-flex flex-column">
							<div className="col mt-4">
								{
									isCurrentUserProfile &&
									<>
										<button type="button"
														onClick = {
															() => {
																navigate('/edit-profile/'+userId)
															}
														}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Edit profile</button>
									</>
								}
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

											<div className="col-8">
												<div>
													<Link to={`/profile/${item.event.eventId}`} className="text-dark">
														<strong>{item.event.name}</strong>
													</Link>
												</div>
											</div>
											<div className="col-4">
												<img src={item.event.img}
														 className="rounded"
														 width="100px" alt=""/>
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

											<div className="col-8">
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
											<div className="col-4">
												<img src={item.event.img}
														 className="rounded"
														 width="100px" alt=""/>
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