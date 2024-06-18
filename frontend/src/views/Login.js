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
import { useNavigate } from "react-router-dom";
import authenticate from "../apiHandlers/authenticate";
import { LockOutlined } from "@mui/icons-material";
import login from "../apiHandlers/login";

export default () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("dang@123");
	const [password, setPassword] = useState("123");

	useEffect(() => {
		// authenticate().then((isAuth) => {
		// 	if (isAuth) navigate("/home");
		// });
	}, []);

	const handleLogin = (e) => {
		e.preventDefault();
		login(email, password).then(([rs, err]) => {
			if (!rs) {
				alert("Unknown error! Please contact dev :)))");
				return;
			}
			if (rs.errorCode === 0) navigate("/");
			else alert("account does not exist!");
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
						Log In
					</Typography>
					<Box
						component="form"
						onSubmit={handleLogin}
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
