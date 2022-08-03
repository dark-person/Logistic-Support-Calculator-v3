import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';	
import InputGroup from 'react-bootstrap/InputGroup';

function ResourceRow({name, state, handler, triple, button_hidden}) {
    return (
        <Form as={Row} className="align-items-center mb-3">
            <Col xs="auto"><Form.Label>{name}</Form.Label></Col>
            <Col xs="auto">
                <Form.Control 
                    className="resource-input mr-1"
                    as="input"
                    type="number"
                    min="0"
                    size="sm"
                    value={state}
                    onChange={handler}
                    onWheel={(e) => e.target.blur()}
                />
             </Col>
             <Col xs="auto">
                {button_hidden ? <Button variant="outline-purple" className="opacity-0">x3</Button> 
                    : <Button variant="outline-purple" onClick={triple}>x3</Button>}
             </Col>
        </Form>
    )
}

function WeightMenu({manpower, ammo, ration, part, handler, triple, allowZero, reset, setZero}){
    return (
        <div className="grid">
            <h2 className="grid-title mb-3">權重：</h2>
            <ResourceRow name="人力" state={manpower} handler={(e) => handler(e, "manpower")} triple={(e) => triple("manpower")} button_hidden={true}/>
            <ResourceRow name="彈藥" state={ammo} handler={(e) => handler(e, "ammo")} triple={(e) => triple("ammo")} button_hidden={true}/>
            <ResourceRow name="口糧" state={ration} handler={(e) => handler(e, "ration")} triple={(e) => triple("ration")} button_hidden={true}/>
            <ResourceRow name="零件" state={part} handler={(e) => handler(e, "part")} triple={(e) => triple("part")}/>
            <Row className="align-items-center mb-3">
                <Col xs="auto">
                    <Form.Label>允許任一資源數字結果為零：</Form.Label>
                    <Form.Label className={allowZero ? "allow" : "not-allow"}>{allowZero ? "允許" : "禁止"}</Form.Label>
                </Col>
            </Row>
            <Row>
                <Col xs="auto"><Button variant="outline-purple" onClick={setZero}>改變規則</Button></Col>
                <Col xs="auto"><Button variant="outline-secondary" onClick={reset}>全部重設</Button></Col>
            </Row>
        </div>
    )
}


function WeightMenuCol(props){
    return (
        <Col xs={true} className="mb-2"> 
            <WeightMenu {...props} />
        </Col>
    )
}

export default WeightMenuCol;
