import React from "react"
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Stack from 'react-bootstrap/Stack'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

import './App.css'

function TeamMenu({state, handler}){
    return (
        <div>
            <h2 className="grid-title">梯隊數</h2>
            <ToggleButtonGroup name="team-toggle" type="radio" value={state} onChange={handler}>
                <ToggleButton id="toggle-team-1" variant="outline-purple" className={1 === state ? "active" : ""} value={1}>1</ToggleButton>
                <ToggleButton id="toggle-team-2" variant="outline-purple" className={2 === state ? "active" : ""} value={2}>2</ToggleButton>
                <ToggleButton id="toggle-team-3" variant="outline-purple" className={3 === state ? "active" : ""} value={3}>3</ToggleButton>
                <ToggleButton id="toggle-team-4" variant="outline-purple" className={4 === state ? "active" : ""} value={4}>4</ToggleButton>
            </ToggleButtonGroup>
        </div>        
    )   
}


function TimeMenu({hour, minute, hourHandler, minuteHandler}){
    return (
        <div>
            <h2 className="grid-title">間隔時間</h2>
            <Form>
                <Form.Group  as={Row} className="px-3">
                    <Form.Control className="col p-1" as="input" 
                        type="number" min="0" max="24"
                        value={hour}
						onChange={hourHandler}
						onWheel={(e) => e.target.blur()}/>
                    <Form.Label className="col pt-1">小時</Form.Label>
                    <Form.Control className="col p-1" as="input" 
                        type="number" min="0" max="59"
                        value={minute}
                        onChange={minuteHandler}
                        onWheel={(e) => e.target.blur()}/>
                    <Form.Label className="col pt-1">分鐘</Form.Label>
                </Form.Group>
            </Form>
        </div>
    )
}

function TeamTimeMenuCol({team, teamHandler, hour, minute, hourHandler, minuteHandler}) {
    return (
        <Col xs={true} className="mb-2">
            <div className="grid">
                <TeamMenu state={team} handler={teamHandler} />
                <br/>
                <TimeMenu hour={hour} minute={minute} hourHandler={hourHandler} minuteHandler={minuteHandler}/>
            </div>
        </Col>   
    )
}

export default TeamTimeMenuCol;