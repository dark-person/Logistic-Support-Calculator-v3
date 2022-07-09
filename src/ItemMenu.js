import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';

function ItemInputCol({label, state, handler}) {
    return (
        <Col>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={6}><Form.Label>{label}</Form.Label></Col>
                <Col xs={6}>
                    <Form.Control 
                        as="input"
                        className="item-input"
                        type="number"
                        min="0"
                        max="4"
                        value={state}
                        onChange={handler}
                        onWheel={(e) => e.target.blur()}
                    />
                </Col>
            </Form>
        </Col>
    )
}

function ItemMenu({quickRestoration, quickProduction, dollContract, equipmentContract, token, handler}) {
    return(
        <div className="grid">
            <h2 className="grid-title mb-3">道具機率獲得次數：</h2>
            <Row xs={1} md={2} lg={3}>
                <ItemInputCol label="快速修理契約" state={quickRestoration} handler={(e) => handler(e, "quickRestoration")}/>
                <ItemInputCol label="快速製造契約" state={quickProduction} handler={(e) => handler(e, "quickProduction")}/>
                <ItemInputCol label="裝備契約" state={equipmentContract} handler={(e) => handler(e, "equipmentContract")}/>
                <ItemInputCol label="人形契約" state={dollContract} handler={(e) => handler(e, "dollContract")}/>
                <ItemInputCol label="採購幣" state={token} handler={(e) => handler(e, "token")}/>
            </Row>
        </div>
    )
}

function ItemMeunCol(props) {
    return (
        <Col xs={true} className="mb-2">
            <ItemMenu {...props}></ItemMenu>
        </Col>
    )
}

export default ItemMeunCol