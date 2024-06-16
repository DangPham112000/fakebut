// IMPORTS
import React, { useState } from "react";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CustomInput from "./CustomInput";

//APP
export default function SettingsCard(props) {
	//TAB STATES
	const [value, setValue] = React.useState("one");

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	// GENDER SELECT STATES
	const genderSelect = [
		{
			value: "male",
			label: "Male",
		},
		{
			value: "female",
			label: "Female",
		},
	];

	// FORM STATES
	const [user, setUser] = useState({
		// DEFAULT VALUES
		firstName: props.firstName,
		lastName: props.lastName,
		midName: props.midName,
		gender: props.gender,
		phone: props.phone,
		email: props.email,
		password: props.password,
		showPassword: false,
	});

	const changeUserProfile = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	//BUTTON STATES
	const [edit, update] = useState({
		required: true,
		disabled: true,
		isEdit: true,
	});

	// EDIT -> UPDATE
	const changeButton = (event) => {
		event.preventDefault();
		user.showPassword = false;
		edit.disabled = !edit.disabled;
		edit.isEdit = !edit.isEdit;
		update({ ...edit });
		console.log("user: ", user);
	};

	// TOGGLE PASSWORD VISIBILITY
	const handlePassword = () => {
		user.showPassword = !user.showPassword;
		setUser({ ...user });
	};

	const handleForm = () => {
		// TBU
	};

	//RETURN
	return (
		<Card variant="outlined" sx={{ height: "100%", width: "100%" }}>
			{/* TABS */}
			<br></br>

			<Tabs
				value={value}
				onChange={handleChange}
				textColor="secondary"
				indicatorColor="secondary"
			>
				<Tab value="one" label="Account" />
				<Tab value="two" label="Posts" />
				<Tab value="three" label="Saved" />
			</Tabs>
			<Divider></Divider>

			{/* MAIN CONTENT CONTAINER */}
			<Box component="form" onSubmit={handleForm} noValidate>
				<CardContent
					sx={{
						p: 3,
						maxHeight: { md: "40vh" },
						textAlign: { xs: "center", md: "start" },
					}}
				>
					{/* FIELDS */}
					<FormControl fullWidth>
						<Grid
							container
							direction={{ xs: "column", md: "row" }}
							columnSpacing={5}
							rowSpacing={3}
						>
							{/* ROW 1: FIRST NAME */}
							<Grid item xs={6}>
								<CustomInput
									id="firstName"
									name="firstName"
									value={user.firstName}
									onChange={changeUserProfile}
									title="First Name"
									disabled={edit.disabled}
									required={edit.required}
								></CustomInput>
							</Grid>

							{/* ROW 1: LAST NAME */}
							<Grid item xs={6}>
								<CustomInput
									id="lastName"
									name="lastName"
									value={user.lastName}
									onChange={changeUserProfile}
									title="Last Name"
									disabled={edit.disabled}
									required={edit.required}
								></CustomInput>
							</Grid>

							{/* ROW 2: MIDDLE NAME */}
							<Grid item xs={6}>
								<CustomInput
									id="midName"
									name="midName"
									value={user.midName}
									onChange={changeUserProfile}
									title="Middle Name"
									disabled={edit.disabled}
									required={edit.required}
								></CustomInput>
							</Grid>

							{/* ROW 2: GENDER */}
							<Grid item xs={6}>
								<CustomInput
									select
									id="gender"
									name="gender"
									value={user.gender}
									onChange={changeUserProfile}
									title="Gender"
									disabled={edit.disabled}
									required={edit.required}
									//MAP THRU OPTIONS
									content={genderSelect.map(
										(option, index) => (
											<MenuItem
												key={index}
												value={option.value}
											>
												{option.label}
											</MenuItem>
										)
									)}
								></CustomInput>
							</Grid>

							{/* ROW 3: PHONE */}
							<Grid item xs={6}>
								<CustomInput
									id="phone"
									name="phone"
									value={user.phone}
									onChange={changeUserProfile}
									title="Phone Number"
									disabled={edit.disabled}
									required={edit.required}
									//DIALING CODE
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												63+
											</InputAdornment>
										),
									}}
								></CustomInput>
							</Grid>

							{/* ROW 3: EMAIL */}
							<Grid item xs={6}>
								<CustomInput
									type="email"
									id="email"
									name="email"
									value={user.email}
									onChange={changeUserProfile}
									title="Email Address"
									disabled={edit.disabled}
									required={edit.required}
								></CustomInput>
							</Grid>

							{/* ROW 4: PASSWORD */}
							<Grid item xs={6}>
								<CustomInput
									id="password"
									name="password"
									value={user.password}
									onChange={changeUserProfile}
									title="Password"
									disabled={edit.disabled}
									required={edit.required}
									type={
										user.showPassword ? "text" : "password"
									}
									// PASSWORD ICON
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={handlePassword}
													edge="end"
													disabled={edit.disabled}
												>
													{user.showPassword ? (
														<VisibilityOff />
													) : (
														<Visibility />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
								></CustomInput>
							</Grid>

							{/* BUTTON */}
							<Grid
								container
								justifyContent={{
									xs: "center",
									md: "flex-end",
								}}
								item
								xs={6}
							>
								<Button
									sx={{
										p: "1rem 2rem",
										my: 2,
										height: "3rem",
									}}
									component="button"
									size="large"
									variant="contained"
									color="secondary"
									onClick={() => props.expose("hello")}
								>
									{edit.isEdit === false ? "UPDATE" : "EDIT"}
								</Button>
							</Grid>
						</Grid>
					</FormControl>
				</CardContent>
			</Box>
		</Card>
	);
}
