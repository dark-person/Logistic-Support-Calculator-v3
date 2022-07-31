import React from "react"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export function DisplayMenu({showManpower, showAmmo, showRation, showPart,
    showQuickRestoration, showQuickProduction, showEquipmentContract,showDollContract, showToken,
    showWeightedValue, showTotalResource, handler, reset}){
    return (
        <div>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>資源</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="人力"
                        checked={showManpower} onChange={(e) => handler(e, "manpower")}/>
                    <Form.Check inline type="checkbox" label="彈藥"
                        checked={showAmmo} onChange={(e) => handler(e, "ammo")}/>
                    <Form.Check inline type="checkbox" label="口糧" 
                        checked={showRation} onChange={(e) => handler(e, "ration")}/>
                    <Form.Check inline type="checkbox" label="零件" 
                        checked={showPart} onChange={(e) => handler(e, "part")}/>
                </Col>
            </Form>
            <hr/>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>道具</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="快速修復"
                        checked={showQuickRestoration} onChange={(e) => handler(e, "quickRestoration")}/>
                    <Form.Check inline type="checkbox" label="快速製造"
                        checked={showQuickProduction} onChange={(e) => handler(e, "quickProduction")}/>
                    <Form.Check inline type="checkbox" label="裝備契約"
                        checked={showEquipmentContract} onChange={(e) => handler(e, "equipmentContract")}/>
                    <Form.Check inline type="checkbox" label="人形契約"
                        checked={showDollContract} onChange={(e) => handler(e, "dollContract")}/>
                    <Form.Check inline type="checkbox" label="採購幣" 
                        checked={showToken} onChange={(e) => handler(e, "token")}/>
                </Col>
            </Form>
            <hr/>
            <Form as={Row} className="align-items-center mb-3">
                <Col xs={3}><Form.Label>其他</Form.Label></Col>
                <Col xs={9}>
                    <Form.Check inline type="checkbox" label="加權值" 
                        checked={showWeightedValue} onChange={(e) => handler(e, "weighted-value")}/>
                    <Form.Check inline type="checkbox" label="資源總量"
                        checked={showTotalResource} onChange={(e) => handler(e, "total-resource")}/>
                </Col>
            </Form>
            <hr/>
            <Button variant="secondary" onClick={reset}>回復預設</Button>{'  '}
            <Button variant="success" onClick={(e) => handler(e, "select-all")}>全部選擇</Button>
        </div>
    )
}

export function DisplayMenuCol(props){
    return (
        <Col xs={true} className="mb-2">
            <DisplayMenu {...props} />
        </Col>
    )
}
