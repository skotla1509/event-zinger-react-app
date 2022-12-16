import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router-dom";
import Required from "../components/required";
import {Gender, Helper, UserRoles} from "../../constants/constants";
import {Navigate} from "react-router";
import {registerThunk} from "../../thunks/users-thunks";
import {setErrorMessage} from "../../reducers/users-reducer";

const Register = () => {
  const {registerSuccess, errorMessage, loading} = useSelector((state) => state.users);
  const [user, setUser] = useState(
    {
      firstName: '',
      lastName: '',
      gender: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      country: '',
      pinCode: '',
      userName: '',
      password: '',
      confirmPassword: '',
      userRole: ''
    });
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spaceBetween = "mt-3";

  const goToNextPage = () => {
    const error = validateFormPage1(user);
    if (error) {
      dispatch(setErrorMessage(error));
    } else {
      dispatch(setErrorMessage(""));
      setPage(page + 1);
    }
  };

  const updateFormData = (field, value) => {
    const newUser = {...user};
    newUser[field] = value;
    setUser(newUser);
  };

  const register = async () => {
    const error = validateFormPage2(user);
    if (error) {
      dispatch(setErrorMessage(error));
    } else {
      dispatch(setErrorMessage(""));
      user.avatar = Helper.getAvatarFromGender(user.gender);
      dispatch(registerThunk(user));
    }
  };

  const redirectToLogin = () => {
    navigate("/login");
  }

  if (registerSuccess) {
    return (<Navigate to={'/login'}/>)
  }

  return (
    <>
      <div className="row justify-content-center m-4">
        <div className="d-none d-lg-block col-lg-4 col-xl-4 position-relative border rounded p-0">
          <img src="../../images/login+register.webp"
               className="card-img-top rounded" alt="..."/>
          <div className="wd-image-caption p-4">
            <h1 className="text-info">Your All-Access Pass</h1>
            <div className="text-white mt-4">
              This is it — millions of live events, up to the minute alerts for your
              favorite artists and teams and, of course, always safe, secure
              ticketing.
            </div>
            <div className="bg-info mt-4" style={{height: "5px", width: "50px"}}></div>
          </div>
        </div>
        <div className="col-12 col-lg-6 col-xl-6 border rounded px-2">
          <div className="row mx-1">
            <div className="col pt-2 pb-2">
              {
                (page === 1) &&
                <>
                  <div className="row">
                    <div className="col">
                      <h3>Register</h3>
                      <span>Already have account?</span>
                      <button type="button"
                              onClick={redirectToLogin}
                              className="btn btn-link pt-0 px-1">Login</button>
                    </div>
                  </div>
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
                    <div className={`col-12 col-sm-12 col-md-12 col-lg-3 col-xl-3 ${spaceBetween}`}>
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
                             placeholder="Enter address line 1"/>
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
                             placeholder="Enter address line 2"/>
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
                             placeholder="Enter city"/>
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
                             placeholder="Enter state"/>
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
                             placeholder="Enter country"/>
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
                             placeholder="Enter zip code"/>
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
                  <div className={`row + ${spaceBetween} float-end`}>
                    <div className="col">
                      <button type="button"
                              onClick={goToNextPage}
                              className="btn btn-primary">Next
                      </button>
                    </div>
                  </div>
                </>
              }
              {
                (page === 2) &&
                <>
                  <div className={`row + ${spaceBetween}`}>
                    <div className="col">
                      <label htmlFor="register-user-name"
                             className="form-label">User Name</label>
                      <Required/>
                      <input id="register-user-name"
                             className="form-control"
                             value={user.userName}
                             onChange={(e) => updateFormData("userName",
                                                             e.target.value)}
                             placeholder="Choose a user name"/>
                    </div>
                  </div>
                  <div className={`row + ${spaceBetween}`}>
                    <div className="col">
                      <label htmlFor="register-password"
                             className="form-label">Password</label>
                      <Required/>
                      <input type="password"
                             id="register-password"
                             className="form-control"
                             value={user.password}
                             onChange={(e) => updateFormData("password",
                                                             e.target.value)}
                             placeholder="Enter password"/>
                    </div>
                  </div>
                  <div className={`row + ${spaceBetween}`}>
                    <div className="col">
                      <label htmlFor="register-confirm-password"
                             className="form-label">Confirm Password</label>
                      <Required/>
                      <input type="password"
                             id="register-confirm-password"
                             className="form-control"
                             value={user.confirmPassword}
                             onChange={(e) => updateFormData("confirmPassword",
                                                             e.target.value)}
                             placeholder="Confirm password"/>
                    </div>
                  </div>
                  <div className={`row + ${spaceBetween}`}>
                    <div className="col">
                      <span>What would you like to do using </span>
                      <i className="text-info">Event Zinger</i>
                      <span>?</span>
                      <div className="form-check m-1">
                        <input className="form-check-input"
                               type="radio"
                               name="register-user-role" id="customer"
                               onClick={() => updateFormData("userRole",
                                                             UserRoles.CUSTOMER)}
                               value={UserRoles.CUSTOMER}/>
                        <label className="form-check-label"
                               htmlFor="register-user-role">
                          Browse events
                        </label>
                      </div>
                      <div className="form-check m-1">
                        <input className="form-check-input" type="radio"
                               name="register-user-role" id="manager"
                               onClick={() => updateFormData("userRole",
                                                             UserRoles.EVENT_MANAGER)}
                               value={UserRoles.EVENT_MANAGER}/>
                        <label className="form-check-label"
                               htmlFor="register-user-role">
                          Manage events
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className={`row + ${spaceBetween}`}>
                    <div className="col">
                      <div>
                        By continuing past this page, you agree to the Terms
                        of Use and understand that information will be used
                        as described in our Privacy Policy.
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
                  <div className={`row + ${spaceBetween} float-end`}>
                    <div className="col">
                      {
                        loading &&
                        <button type="button"
                                disabled
                                onClick={register}
                                className="btn btn-secondary">
                          ...loading
                        </button>
                      }
                      {
                        !loading &&
                        <button type="button"
                                onClick={register}
                                className="btn btn-primary">Register
                        </button>
                      }
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const validateFormPage1 = (formData) => {
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
const validateFormPage2 = (formData) => {
  let errorMessage = "";

  if (!formData.userName) {
    errorMessage += "User Name is missing! ";
  }
  if (!formData.password) {
    errorMessage += "Password is missing! ";
  }
  if (!formData.confirmPassword) {
    errorMessage += "Confirm Password is missing! ";
  }
  if (formData.password !== formData.confirmPassword) {
    errorMessage += "Password and Confirm Password don't match! ";
  }
  if (!formData.userRole) {
    errorMessage += "User Role is missing! ";
  }
  return errorMessage;
}

export default Register;