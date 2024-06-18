import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Login from "./views/Login";
import Home from "./views/Home";
import Register from "./views/Register";
import Profile from "./views/Profile";
import NavBar from "./components/Navbars/AppBar";
import theme from "./theme";

export default () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline>
				<BrowserRouter>
					<NavBar />
					<Routes>
						<Route path="/login" exact element={<Login />} />
						<Route path="/" exact element={<Home />} />
						<Route path="/register" exact element={<Register />} />
						<Route path="/profile" exact element={<Profile />} />
						<Route path="*" element={<Navigate to="/" replace />} />
					</Routes>
				</BrowserRouter>
			</CssBaseline>
		</ThemeProvider>
	);
};
