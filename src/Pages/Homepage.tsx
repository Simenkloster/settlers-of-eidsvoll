import React from "react";
import "./Homepage.css";
import Header from "../Components/Header";

const Homepage = () => {
	return (
		<div className="HomepageContainer">
			<Header />
			<div className="Velkommen"> Hvem er du? </div>
		</div>
	);
};

export default Homepage;
