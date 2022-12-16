import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import {findCommentsByUserThunk} from "../../thunks/comments-thunks";
import {findInterestsByUserThunk} from "../../thunks/people-interested-thunks";
import {
	findUserByIdThunk,
	logoutThunk,
	profileThunk,
	updateProfileThunk
} from "../../thunks/users-thunks";
import {findAllTransactionsByUserThunk} from "../../thunks/tickets-thunks";
import {Gender, Helper} from "../../constants/constants";
import Required from "../components/required";
import {setErrorMessage} from "../../reducers/users-reducer";

const ViewProfile = () => {
	const {userId} = useParams()
	const {comments} = useSelector((state) => state.comments);
	const {interestedEvents} = useSelector((state) => state.interests);
	const {currentUser, publicProfile, errorMessage, loading} = useSelector((state) => state.users)
	const {transactions} = useSelector((state) => state.tickets);
	const [isEdit, setIsEdit] = useState(false);
	const [user, setUser] = useState(currentUser);
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

	const spaceBetween = "mt-3";
	const updateFormData = (field, value) => {
		const newUser = {...user};
		newUser[field] = value;
		setUser(newUser);
	};

	const handleSaveChanges = async () => {
		const error = validateForm(user);
		if (error) {
			dispatch(setErrorMessage(error));
		} else {
			dispatch(setErrorMessage(""));
			await dispatch(updateProfileThunk(
				{
					userId: currentUser._id,
					updates: {
						firstName: user.firstName,
						lastName: user.lastName,
						gender: user.gender,
						addressLine1: user.addressLine1,
						addressLine2: user.addressLine2,
						city: user.city,
						state: user.state,
						country: user.country,
						pinCode: user.pinCode
					}
				}));
			setIsEdit(false);
		}
	}

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
					{
						!isEdit &&
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
																				 className="text-warning px-2"/>
												Events you marked as interested
										</span>
											}
											{
												!isCurrentUserProfile &&
												<span>
												<FontAwesomeIcon icon="fa-solid fa-star"
																				 style={{width: "20px"}}
																				 className="text-warning px-2"/>
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
																			 className="text-secondary px-2"/>
											Events you commented about
										</span>
											}
											{
												!isCurrentUserProfile &&
												<span>
												<FontAwesomeIcon icon="fa-solid fa-comment"
																				 style={{width: "20px"}}
																				 className="text-secondary px-2"/>
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
																onClick={
																	() => {
																		setIsEdit(true);
																		// navigate('/edit-profile/')
																	}
																}
																style={{backgroundColor: "rgb(144,78,186)"}}
																className="btn m-2 rounded-pill text-white">
													Edit profile
												</button>
												<button type="button"
																onClick={() => {
																	dispatch(logoutThunk());
																	navigate('/')
																}
																}
																style={{backgroundColor: "rgb(144,78,186)"}}
																className="btn m-2 rounded-pill text-white">
													Logout
												</button>
											</>
										}
									</div>
								</div>
							}
						</>
					}
					{
						isEdit &&
						<>
							<div className="row d-flex flex-column">
								<div className="col-12 mt-4">
									<div className="row">
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-first-name"
														 className="form-label">First Name</label>
											<Required/>
											<input id="register-first-name"
														 className="form-control"
														 value={user.firstName}
														 onChange={(e) => updateFormData("firstName",
																														 e.target.value)}
														 placeholder="Enter first name"/>
										</div>
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-last-name"
														 className="form-label">Last Name</label>
											<Required/>
											<input id="register-last-name"
														 className="form-control"
														 value={user.lastName}
														 onChange={(e) => updateFormData("lastName",
																														 e.target.value)}
														 placeholder="Enter last name"/>
										</div>
									</div>
									<div className="row">
										<div className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<span>Gender </span>
											<Required/>
										</div>
										<div className={`col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 ${spaceBetween}`}>
											<div className="form-check form-check-inline m-1">
												<input className="form-check-input"
															 type="radio"
															 name="register-gender" id="male"
															 onClick={() => updateFormData("gender",
																														 Gender.MALE)}
															 value={Gender.MALE}/>
												<label className="form-check-label"
															 htmlFor="register-gender">
													Male
												</label>
											</div>
										</div>
										<div className={`col-6 col-sm-6 col-md-6 col-lg-2 col-xl-2 ${spaceBetween}`}>
											<div className="form-check form-check-inline m-1">
												<input className="form-check-input"
															 type="radio"
															 name="register-gender" id="female"
															 onClick={() => updateFormData("gender",
																														 Gender.FEMALE)}
															 value={Gender.FEMALE}/>
												<label className="form-check-label"
															 htmlFor="register-gender">
													Female
												</label>
											</div>
										</div>
									</div>
									<div className="row">
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-address-line1"
														 className="form-label">Address Line 1</label>
											<Required/>
											<input id="register-address-line1"
														 className="form-control"
														 value={user.addressLine1}
														 onChange={(e) => updateFormData("addressLine1",
																														 e.target.value)}
														 placeholder="Edit address line 1"/>
										</div>
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-address-line2"
														 className="form-label">Address Line 2</label>
											<input id="register-address-line2"
														 className="form-control"
														 value={user.addressLine2}
														 onChange={(e) => updateFormData("addressLine2",
																														 e.target.value)}
														 placeholder="Edit address line 2"/>
										</div>
									</div>
									<div className="row">
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-city"
														 className="form-label">City</label>
											<Required/>
											<input id="register-city"
														 className="form-control"
														 value={user.city}
														 onChange={(e) => updateFormData("city",
																														 e.target.value)}
														 placeholder="Edit city"/>
										</div>
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-state"
														 className="form-label">State</label>
											<Required/>
											<input id="register-state"
														 value={user.state}
														 onChange={(e) => updateFormData("state",
																														 e.target.value)}
														 className="form-control"
														 placeholder="Edit state"/>
										</div>
									</div>
									<div className="row">
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-country"
														 className="form-label">Country</label>
											<Required/>
											<input id="register-country"
														 value={user.country}
														 onChange={(e) => updateFormData("country",
																														 e.target.value)}
														 className="form-control"
														 placeholder="Edit country"/>
										</div>
										<div
											className={`col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 ${spaceBetween}`}>
											<label htmlFor="register-pincode"
														 className="form-label">Zip/Postal Code</label>
											<Required/>
											<input id="register-pincode"
														 value={user.pinCode}
														 onChange={(e) => updateFormData("pinCode",
																														 e.target.value)}
														 className="form-control"
														 placeholder="Edit zip code"/>
										</div>
									</div>
								</div>
							</div>
							{
								errorMessage &&
								<div className={`row + ${spaceBetween}`}>
									<div className="col">
										<div className="text-danger">{errorMessage}</div>
										<div className="text-danger">Please fix above errors
											to proceed to next step.
										</div>
									</div>
								</div>
							}
							<div className="row d-flex flex-column">
								<div className="col mt-4">
									{
										loading &&
										<button type="button"
														disabled
														className="btn btn-secondary">
											...loading
										</button>
									}
									{
										!loading &&
										<button type="button"
														onClick={handleSaveChanges}
														style={{backgroundColor: "rgb(144,78,186)"}}
														className="btn m-2 rounded-pill text-white">
											Save changes</button>
									}
								</div>
							</div>
						</>
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
									<li className="list-group-item"
											key={"interested-" + item.event._id + "-" + index}>
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

const validateForm = (formData) => {
	let errorMessage = "";
	if (!formData.firstName) {
		errorMessage += "First Name is missing! ";
	}
	if (!formData.lastName) {
		errorMessage += "Last Name is missing! ";
	}
	if (!formData.gender) {
		errorMessage += "Gender is missing! ";
	}
	if (!formData.addressLine1) {
		errorMessage += "Address Line 1 is missing! ";
	}
	if (!formData.city) {
		errorMessage += "City is missing! ";
	}
	if (!formData.state) {
		errorMessage += "State is missing! ";
	}
	if (!formData.country) {
		errorMessage += "Country is missing! ";
	}
	if (!formData.pinCode) {
		errorMessage += "Zip Code is missing! ";
	}
	return errorMessage;
}
export default ViewProfile