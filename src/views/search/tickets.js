import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileThunk} from "../../thunks/users-thunks";

const Tickets = () => {
	const {details} = useSelector((state) => state.search)
	const {currentUser} = useSelector((state) => state.users)
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(profileThunk())
	}, []);

	return(
		<>

		</>
	)
}

export default Tickets;