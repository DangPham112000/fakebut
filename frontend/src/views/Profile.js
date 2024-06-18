import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Navbar from "../components/Navbars/AppBar.js";
import { useNavigate } from "react-router-dom";
import isAuthenticated from "../utils/isAuthenticated.js";
import SettingsCard from "../components/Profile/SettingsCard.js";
import ProfileCard from "../components/Profile/ProfileCard.js";
import getUserProfile from "../apiHandlers/getUserProfile.js";

export default () => {
	const navigate = useNavigate();

	const [text, setText] = useState("");
	const [userProfile, setUserProfile] = useState({});

	useEffect(() => {
		if (!isAuthenticated()) {
			navigate("/login");
			return;
		}
		const user = getUserProfile();
		setUserProfile(user);
	}, []);

	const fullName = `${userProfile.firstName} ${userProfile.lastName}`;

	return (
		<>
			<Grid container direction="column" sx={{ overflowX: "hidden" }}>
				{/* COMPONENTS */}
				<Grid
					container
					direction={{ xs: "column", md: "row" }}
					spacing={3}
					sx={{
						position: "absolute",
						top: "20vh",
						px: { xs: 0, md: 7 },
					}}
				>
					{/* PROFILE CARD */}
					<Grid item md={3}>
						<ProfileCard
							name={fullName}
							sub={userProfile.title}
							email={userProfile.email}
							gender={userProfile.gender}
							phone={userProfile.phone}
							avatar={userProfile.avatar}
						></ProfileCard>
					</Grid>

					{/* SETTINGS CARD */}
					<Grid item md={9}>
						<SettingsCard
							expose={(v) => setText(v)}
							firstName={userProfile.firstName}
							lastName={userProfile.lastName}
							midName={userProfile.midName}
							phone={userProfile.phone}
							email={userProfile.email}
							password={userProfile.password}
							gender={userProfile.gender}
						></SettingsCard>
					</Grid>
				</Grid>
			</Grid>
		</>
	);
};
