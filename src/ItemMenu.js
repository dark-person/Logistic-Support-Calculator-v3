import React, {useState}from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleQuestion} from '@fortawesome/free-solid-svg-icons'

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

function ItemMenu({quickRestoration, quickProduction, dollContract, equipmentContract, token, handler, reset}) {
    const [showModal, setShowModal] = useState(false)
    
    return(
        <div className="grid">
            <h2 className="grid-title mb-3">
                道具機率獲得次數<FontAwesomeIcon className="mx-2" icon={faCircleQuestion} size="sm" onClick={() => setShowModal(true)}/>
            </h2>
            <Row xs={1} md={2} lg={3}>
                <ItemInputCol label="快速修理契約" state={quickRestoration} handler={(e) => handler(e, "quickRestoration")}/>
                <ItemInputCol label="快速製造契約" state={quickProduction} handler={(e) => handler(e, "quickProduction")}/>
                <ItemInputCol label="裝備契約" state={equipmentContract} handler={(e) => handler(e, "equipmentContract")}/>
                <ItemInputCol label="人形契約" state={dollContract} handler={(e) => handler(e, "dollContract")}/>
                <ItemInputCol label="採購幣" state={token} handler={(e) => handler(e, "token")}/>
                <Col><Button variant="outline-secondary" onClick={reset}>重設道具次數</Button></Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>道具機率獲得次數－使用說明</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>後勤有機會獲得道具獎勵，但機率未知，已知大成功會一定列表中的道具。</p>
                    <p class="caution-description">而這參數，是以盡量提高某道具的出現率為目的，並非保證能獲得。</p>
                    <p>以2-3（代號11 工廠快遞）為例，會有機會出現[快速製造契約]和[快速修理契約]，在這裡[快速製造契約]和[快速修理契約]各為0.5次。</p>
                    <p>而1-4（代號8  全境搜查），則只會有機會出現[人形製造契約]，因此，[人形製造契約]為1次。</p>
                    <p>目前計算器對次數的限制為：「不能大於4，不能少於0」，然而，次數設得太高，將會令可行組合數量更少，甚至沒有。</p>
                    <p><b>理論上，把次數設成1～2次已經有效。</b></p>
                    <p></p>
                </Modal.Body>
            </Modal>
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