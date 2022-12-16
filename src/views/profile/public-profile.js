import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findCommentsByUserThunk} from "../../thunks/comments-thunks";
import {findInterestsByUserThunk} from "../../thunks/people-interested-thunks";
import {
	findUserByIdThunk,
	profileThunk
} from "../../thunks/users-thunks";
import {findAllTransactionsByUserThunk} from "../../thunks/tickets-thunks";
import {Helper} from "../../constants/constants";
import FooterProfile from "./profile-footer";

const PublicProfile = ({userId}) => {
	const {comments} = useSelector((state) => state.comments);
	const {interestedEvents} = useSelector((state) => state.interests);
	const {publicProfile} = useSelector((state) => state.users)
	const {transactions} = useSelector((state) => state.tickets);
	const dispatch = useDispatch();
	useEffect(() => {
		/*
		dispatch(findUserByIdThunk(userId));
		 */
		dispatch(findInterestsByUserThunk(userId));
		dispatch(findCommentsByUserThunk(userId));
		dispatch(findAllTransactionsByUserThunk(userId))
	}, []);
	
	return (
		<div className="container">
			<div className="row mt-4">
				<div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
					<div>
						<img src={"../../images/" + publicProfile.avatar} className="rounded-circle"
								 width="100%"
								 alt=""/>
					</div>
					<div className="pt-2 text-center">
						<h4 className="text-secondary">@{publicProfile.userName}</h4>
						<div>
							<FontAwesomeIcon icon="fa-solid fa-calendar-days"
															 className="pt-1"/>
							<span className="px-2">Joined on</span>
							<div>{publicProfile.dateOfJoining ? Helper.formatDateFromTimeStamp(
								publicProfile.dateOfJoining) : "NA"}</div>
						</div>
					</div>
				</div>
				<div className="col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10">
					<>
						<div className="row d-flex flex-column">
							<div className="col mt-2">
								<div style={{color: "rgb(144,78,186)"}}>
									<h2><strong>{publicProfile.firstName} {publicProfile.lastName}</strong></h2>
								</div>
							</div>
							<div className="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 mt-4">
								<ul className="list-group list-group-flush">
									<li className="list-group-item d-flex justify-content-between align-items-center">
											<span>
											<FontAwesomeIcon icon="fa-solid fa-clock-rotate-left"
																			 style={{width: "20px"}}
																			 className="text-info px-2"/>
												Recent activity
											</span>
										<span className="badge badge-primary badge-pill bg-primary">
											{
												transactions.length
											}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
											<span>
												<FontAwesomeIcon icon="fa-solid fa-star"
																				 style={{width: "20px"}}
																				 className="text-warning px-2"/>
												Events marked as interested
											</span>
										<span className="badge badge-primary badge-pill bg-primary">
											{
												interestedEvents.length
											}
										</span>
									</li>
									<li className="list-group-item d-flex justify-content-between align-items-center">
											<span>
											<FontAwesomeIcon icon="fa-solid fa-comment"
																			 style={{width: "20px"}}
																			 className="text-secondary px-2"/>
											Events commented about
											</span>
										<span className="badge badge-primary badge-pill bg-primary">
											{
												comments.length
											}
										</span>
									</li>
								</ul>
							</div>
						</div>
					</>
				</div>
			</div>
			<div className="mt-4 row border-secondary border-2 border-top"></div>
			<FooterProfile userId={userId}/>
		</div>
	)
}

export default PublicProfile;