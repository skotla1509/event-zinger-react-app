import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {deleteUserThunk, findAllUsersThunk, profileThunk} from "../../thunks/users-thunks";
import {Helper} from "../../constants/constants";

const Users = () => {
	const {currentUser, publicProfile, users} = useSelector((state) => state.users)
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		dispatch(profileThunk());
		dispatch(findAllUsersThunk());
	}, []);

	return (
		<div className="container">
			<div className="row align-items-start mb-4">
				<div className="col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mt-4">
					<h4>All users</h4>
					<ul className="list-group">
						{
							users.map(
								(item, index) =>
									<li className="list-group-item" key={"user-" + item._id + "-" + index}>
										<div className="row align-items-center">
											<div className="col-auto">
												<img src={"../../images/" + item.avatar}
														 className="rounded"
														 width="50px" alt=""/>
											</div>
											<div className="col-6">
												<div>
													<Link to={`/profile/${item._id}`} className="text-dark">
														<strong>{item.firstName + " " + item.lastName}</strong>
													</Link>
													<i className="px-2">@{item.userName}</i>
												</div>
												<div>
													<span>Joined on: </span>
													<i>"{item.dateOfJoining ? Helper.formatDateFromTimeStamp(item.dateOfJoining) : "NA"}"</i>
												</div>
												<div>
													<span>User Role: </span>
													<i>"{Helper.getRoleName(item.userRole)}"</i>
												</div>
											</div>
											<div className="col-4">
												<button className="btn btn-primary rounded float-end"
																onClick={() => {dispatch(deleteUserThunk(item._id))}}>Delete
												</button>
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
export default Users