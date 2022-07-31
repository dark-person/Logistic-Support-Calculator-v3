import React from "react";
import './App.css';

import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'

import egg from "./waifu-min.gif";

function EasterEgg(props){
	return(
		<div className="grid">
			<h4 className="title">這是我老婆萌萌躂</h4>
			<div className="section">
				<Image src={egg} fluid />
			</div>
		</div>)
}

function EasterEggCol(props){
	return (
		<Col xs={true} className="mb-2 d-none d-md-block d-lg-none"> 
			<EasterEgg />
		</Col>
	)
}

export default EasterEggCol;