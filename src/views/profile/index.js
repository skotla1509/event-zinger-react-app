import React from "react";
import {useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import EditProfile from "./edit-profile";
import ViewProfile from "./view-profile";
import {findUserByIdThunk} from "../../thunks/users-thunks";
import {useDispatch} from "react-redux";

const Profile = () => {
	const {pathname} = useLocation()
	const {userId} = useParams();
	const parts = pathname.split('/');
	const dispatch = useDispatch();

	useEffect(() => {
		console.log("USEEEEEEEEEEEEEEEEEE");
		dispatch(findUserByIdThunk(userId))
	}, []);

	if (parts[1].includes("edit")) {
		return (
			<>
				<h1>Profile</h1>
			</>
		)
	}
	return (
		<>
			<h1>Edit Profile</h1>
		</>
	);
}

export default Profile;