import React from "react";
import {useEffect} from "react";
import {useParams} from "react-router";
import {findUserByIdThunk, profileThunk} from "../../thunks/users-thunks";
import {useDispatch, useSelector} from "react-redux";
import CurrentProfile from "./current-profile";
import PublicProfile from "./public-profile";
import {Navigate} from "react-router-dom";

const Profile = () => {
	const {userId} = useParams();
	const {currentUser, publicProfile} = useSelector((state) => state.users)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(profileThunk());
		if (userId) {
			dispatch(findUserByIdThunk(userId))
		}
	}, []);

	if (!userId && !currentUser) {
		return (
			<Navigate to="/login" />
		)
	}
	else if (!userId && currentUser) {
		return (
			<CurrentProfile/>
		)
	}
	else if (userId && !publicProfile) {
		return (
			<h3>My backend systems are down. Apologize for the inconvenience.</h3>
		)
	}
	else if (currentUser && currentUser._id === publicProfile._id) {
		return (
			<CurrentProfile/>
		)
	}
	else {
		return (
			<PublicProfile userId={userId}/>
		)
	}
}

export default Profile;