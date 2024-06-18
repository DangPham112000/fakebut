import { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbars/AppBar";
import { Container } from "@mui/material";
import isAuthenticated from "../utils/isAuthenticated";

export default () => {
	const [mvs, setMvs] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		// const fetchData = async () => {
		// 	const isAuth = await authenticate();
		// 	if (isAuth) {
		// 		const movieResp = await fetch(`${API_URL}`, {
		// 			method: "GET",
		// 		});
		// 		const movies = await movieResp.json();
		// 		console.log("movies: ", movies);
		// 		if (Array.isArray(movies)) setMvs(movies);
		// 	} else navigate("/login");
		// };
		// fetchData();
		if (!isAuthenticated()) navigate("/login");
	}, []);

	return (
		<>
			<h1>THIS IS HOME PAGE</h1>
		</>
		// <>
		// 	<Navbar />
		// 	<section className="section section-shaped section-lg">
		// 		<div className="shape shape-style-1 shape-default alpha-4">
		// 			<span />
		// 			<span />
		// 			<span />
		// 			<span />
		// 			<span />
		// 			<span />
		// 			<span />
		// 		</div>
		// 		<Container>
		// 			<h1>Hi this is HomePage</h1>
		// 			{mvs.map((mv) => (
		// 				<div key={mv._id}>
		// 					<h3>{mv.title}</h3>
		// 					<span>{mv.plot}</span>
		// 					<br />
		// 				</div>
		// 			))}
		// 		</Container>
		// 	</section>
		// </>
	);
};
