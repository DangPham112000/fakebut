import React, { useEffect, useState } from "react";
import {
	Button,
	Container,
	Box,
	CssBaseline,
	Avatar,
	Typography,
	TextField,
	FormControlLabel,
	Grid,
	Checkbox,
	Link,
} from "@mui/material";
import githubSvg from "../assets/img/icons/common/github.svg";
import googleSvg from "../assets/img/icons/common/google.svg";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import authenticate from "../apiHandlers/authenticate";
import { LockOutlined } from "@mui/icons-material";

export default () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("dang@123");
	const [password, setPassword] = useState("123");

	useEffect(() => {
		fetch(`${API_URL}/google`)
			.then((e) => e.text())
			.then(console.log);
		authenticate().then((isAuth) => {
			if (isAuth) navigate("/profile");
		});
	}, []);

	const handleForm = (e) => {
		e.preventDefault();
		fetch(`${API_URL}/login`, {
			method: "POST",
			credentials: "include",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		})
			.then((res) => res.json())
			.then((rs) => {
				if (rs.login) {
					navigate("/");
				} else {
					alert("account does not exist!");
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
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleForm}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<FormControlLabel
							control={
								<Checkbox value="remember" color="primary" />
							}
							label="Remember me"
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Register"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</>
	);
};
