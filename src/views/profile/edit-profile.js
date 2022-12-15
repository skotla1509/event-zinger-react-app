import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import './index.css';
import Required from "../components/required";
import {Gender} from "../../constants/constants";
import {setErrorMessage} from "../../reducers/users-reducer";
import {profileThunk, updateProfileThunk} from "../../thunks/users-thunks";

const EditProfile = () => {
	let {currentUser, errorMessage, loading} = useSelector((state) => state.users);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(profileThunk());
	}, []);

	if (!currentUser) {
		currentUser = {}
	}
	const [user, setUser] = useState(
		{
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			gender: currentUser.gender,
			addressLine1: currentUser.addressLine1,
			addressLine2: currentUser.addressLine2,
			city: currentUser.city,
			state: currentUser.state,
			country: currentUser.country,
			pinCode: currentUser.pinCode
		});

	if (!Object.keys(currentUser).length) {
		return(
			<>
				<h3>403 Unauthorized</h3>
			</>
		)
	}

	const spaceBetween = "mt-3";
	const updateFormData = (field, value) => {
		const newUser = {...user};
		newUser[field] = value;
		setUser(newUser);
	};

	const handleSaveChanges = () => {
		const error = validateForm(user);
		if (error) {
			dispatch(setErrorMessage(error));
		} else {
			dispatch(setErrorMessage(""));
			dispatch(updateProfileThunk(
				{
					userId: currentUser._id,
					updates: user
				}));
		}
	}

	return (
		<div className="container">
			<div className="row mt-4">
				<div className="col-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
					<div>
						<img src={"../../images/" + currentUser.avatar} className="rounded-circle" width="100%"
								 alt=""/>
					</div>
					<div className="pt-2 text-center">
						<h4 className="text-secondary">@{currentUser.userName}</h4>
						<div>
							<FontAwesomeIcon icon="fa-solid fa-calendar-days"
															 className="pt-1"/>
							<span className="px-2">Joined on</span>
						</div>
					</div>

				</div>
				<div className="col-8 col-sm-8 col-md-8 col-lg-10 col-xl-10">
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

export default EditProfile