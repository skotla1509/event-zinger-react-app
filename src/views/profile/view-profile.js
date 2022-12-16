import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findCommentsByUserThunk} from "../../thunks/comments-thunks";
import {findInterestsByUserThunk} from "../../thunks/people-interested-thunks";
import {findUserByIdThunk, logoutThunk, profileThunk} from "../../thunks/users-thunks";
import {findAllTransactionsByUserThunk} from "../../thunks/tickets-thunks";

const ViewProfile = () => {
	const {userId} = useParams()
	const {comments} = useSelector((state) => state.comments);
	const {interestedEvents} = useSelector((state) => state.interests);
	const {currentUser, publicProfile} = useSelector((state) => state.users)
	const {transactions} = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
  const navigate = useNavigate();
	useEffect(() => {
		dispatch(profileThunk());
		dispatch(findUserByIdThunk(userId));
		dispatch(findInterestsByUserThunk(userId));
		dispatch(findCommentsByUserThunk(userId));
		dispatch(findAllTransactionsByUserThunk(userId))
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
												transactions.length
											}
										</span>
								</li>
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
											<FontAwesomeIcon icon="fa-solid fa-comment"
																			 style={{width: "20px"}}
																			 className="text-secondary px-2" />
											Events you commented about
										</span>
									}
									{
										!isCurrentUserProfile &&
										<span>
												<FontAwesomeIcon icon="fa-solid fa-comment"
																				 style={{width: "20px"}}
																				 className="text-secondary px-2" />
												Events commented about
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
																navigate('/edit-profile/')
															}
														}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Edit profile</button>
										<button type="button"
														onClick = {() => {
																dispatch(logoutThunk());
																navigate('/')
															}
														}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Logout</button>
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
					<h4>Recent activity</h4>
					<ul className="list-group">
						{
							transactions.map(
								(item, index) =>
									<li className="list-group-item" key={"attended-" + item.user._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<Link to={`/details/${item.event.eventId}`} className="text-dark">
														<strong>{item.event.name}</strong>
													</Link>
												</div>
												<div>
													{
														isCurrentUserProfile &&
														<span>{item.type === "BUY" ? "You bought" : "You sold"} </span>
													}
													{
														!isCurrentUserProfile &&
														<span>{item.type === "BUY" ? "Bought" : "Sold"} </span>
													}
													<i>"{item.tickets} tickets"</i>
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
					<h4>Events interested</h4>
					<ul className="list-group">
						{
							interestedEvents.map(
								(item, index) =>
									<li className="list-group-item" key={"interested-" + item.event._id + "-" + index}>
										<div className="row align-items-center">

											<div className="col-8">
												<div>
													<Link to={`/details/${item.event.eventId}`} className="text-dark">
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
					<h4>Comments</h4>
					<ul className="list-group">
						{
							comments.map(
								(item, index) =>
									<li className="list-group-item" key={"comments-" + item.event._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-8">
												<div>
													<Link to={`/details/${item.event.eventId}`} className="text-dark">
														<strong>{item.event.name}</strong>
													</Link>
												</div>
												<div>
													{
														isCurrentUserProfile &&
														<span>You said </span>
													}
													{
														!isCurrentUserProfile &&
														<span>Said </span>
													}
													<i>"{item.comment}"</i>
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