import React, {useState}from "react"
import './App.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function ResultArea(){
    return (
        <div>
            hello
        </div>
    )
}

function ResultAreaCol(props){
    return (
        <Col xs={true} className="mb-2">
            <ResultArea {...props}/>
        </Col>
    )
}

export default ResultAreaCol
