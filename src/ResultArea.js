import React, {useState}from "react"
import './App.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import * as table_utils from './tableUtils.js'

function DataRow({rowData, styleObj, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){
    return (
        <tr className="d-flex">
            <td style={styleObj.combination}>{rowData.combination}</td>
            {showManpower && <td style={styleObj.manpower}>{rowData.manpower}</td>}
			{showAmmo && <td style={styleObj.ammo}>{rowData.ammo}</td>}
			{showRation && <td style={styleObj.ration}>{rowData.ration}</td>}
			{showPart && <td style={styleObj.part}>{rowData.part}</td>}
			{showQuickRestoration && <td style={styleObj.quickRestoration}>{rowData.quickRestoration}</td>}
			{showQuickProduction && <td style={styleObj.quickProduction}>{rowData.quickProduction}</td>}
			{showDollContract && <td style={styleObj.tDollContract}>{rowData.tDollContract}</td>}
			{showEquipmentContract && <td style={styleObj.equipmentContract}>{rowData.equipmentContract}</td>}
			{showToken && <td style={styleObj.token}>{rowData.token}</td>}
			{showWeightedValue && <td style={styleObj.value}>{rowData.value}</td>}
			{showTotalResource && <td style={styleObj.totalResource}>{rowData.totalResource}</td>}
        </tr>
    )
}

function TableHeader({styleObj, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}) {
    return (
        <tr className="d-flex">
            <th style={styleObj.combination}>{table_utils.fieldLabel.combination}</th>
            {showManpower && <th style={styleObj.manpower}>{table_utils.fieldLabel.manpower}</th>}
            {showAmmo && <th style={styleObj.ammo}>{table_utils.fieldLabel.ammo}</th>}
            {showRation &&<th style={styleObj.ration}>{table_utils.fieldLabel.ration}</th>}
            {showPart && <th style={styleObj.part}>{table_utils.fieldLabel.part}</th>}
            {showQuickRestoration && <th style={styleObj.quickRestoration}>{table_utils.fieldLabel.quickRestoration}</th>}
            {showQuickProduction && <th style={styleObj.quickProduction}>{table_utils.fieldLabel.quickProduction}</th>}
            {showDollContract && <th style={styleObj.tDollContract}>{table_utils.fieldLabel.tDollContract}</th>}
            {showEquipmentContract && <th style={styleObj.equipmentContract}>{table_utils.fieldLabel.equipmentContract}</th>}
            {showToken && <th style={styleObj.token}>{table_utils.fieldLabel.token}</th>}
            {showWeightedValue && <th style={styleObj.value}>{table_utils.fieldLabel.value}</th>}
            {showTotalResource && <th style={styleObj.totalResource}>{table_utils.fieldLabel.totalResource}</th>}
        </tr>
    )
}


function ResultArea({data, styleObj, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){
                
    return (
        <div className="grid scrollable">
            <Table striped bordered hover size="sm" variant="dark">	
                <thead>
                    <TableHeader styleObj={styleObj} showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
                        showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction} 
                        showEquipmentContract={showEquipmentContract} showDollContract={showDollContract} 
                        showToken={showToken} showTotalResource={showTotalResource}
                        showWeightedValue={showWeightedValue}/>
                </thead>
                <tbody>
                    {data.map((item, index) => 
                        <DataRow key={"data-"+index} rowData={item} styleObj={styleObj} showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
                        showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction} 
                        showEquipmentContract={showEquipmentContract} showDollContract={showDollContract} 
                        showToken={showToken} showTotalResource={showTotalResource}
                        showWeightedValue={showWeightedValue}/>)
                    }
                </tbody>
            </Table>
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
