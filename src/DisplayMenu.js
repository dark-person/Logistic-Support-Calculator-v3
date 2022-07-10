import React from "react"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import Accordion from 'react-bootstrap/Accordion'

function DisplayMenu(props){
    return (
        <div>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>資源</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="人力"/>
                    <Form.Check inline type="checkbox" label="彈藥"/>
                    <Form.Check inline type="checkbox" label="口糧"/>
                    <Form.Check inline type="checkbox" label="零件"/>
                </Col>
            </Form>
            <hr/>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>道具</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="快速修復"/>
                    <Form.Check inline type="checkbox" label="快速製造"/>
                    <Form.Check inline type="checkbox" label="裝備契約"/>
                    <Form.Check inline type="checkbox" label="人形契約"/>
                    <Form.Check inline type="checkbox" label="採購幣"/>
                </Col>
            </Form>
            <hr/>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>其他</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="加權值"/>
                    <Form.Check inline type="checkbox" label="資源總量"/>
                </Col>
            </Form>
            {/* <h2 className="grid-title mb-3">結果顯示選項：</h2>     */}
        </div>
    )
}

function DisplayMenuCol(props){
    return (
        <Col xs={true} className="mb-2">
            <DisplayMenu {...props} />
        </Col>
    )
}

export default DisplayMenuCol