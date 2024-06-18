import React, { useState } from "react";
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	CssBaseline,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from "@mui/material";
import githubSvg from "../assets/img/icons/common/github.svg";
import googleSvg from "../assets/img/icons/common/google.svg";
import { useNavigate } from "react-router-dom";
import { LockOutlined } from "@mui/icons-material";
import register from "../apiHandlers/register";

export default () => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("Pham");
	const [lastName, setLastName] = useState("Dang ne");
	const [email, setEmail] = useState("dang@123");
	const [password, setPassword] = useState("123");

	const handleRegister = (e) => {
		e.preventDefault();
		register(firstName, lastName, email, password).then(([rs, err]) => {
			if (err) {
				alert("Unexpected client error occur!");
				return;
			}
			if (rs) {
				if (rs.errorCode === 0) {
					navigate("/login");
					return;
				}
				if (rs.errorCode === 7) {
					alert("This email is already registed!");
					return;
				}
				alert("Unexpected server error occur!");
			}
		});
	};

	return (
		<>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlined />
					</Avatar>
					<Typography component="h1" variant="h5">
						Register
					</Typography>
					<Box
						component="form"
						noValidate
						onSubmit={handleRegister}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="given-name"
									name="firstName"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									value={firstName}
									onChange={(e) =>
										setFirstName(e.target.value)
									}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="family-name"
									value={lastName}
									onChange={(e) =>
										setLastName(e.target.value)
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
									value={password}
									onChange={(e) =>
										setPassword(e.target.value)
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<FormControlLabel
									control={
										<Checkbox
											value="allowExtraEmails"
											color="primary"
										/>
									}
									label="I want to receive inspiration, marketing promotions and updates via email."
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Log In
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
};
