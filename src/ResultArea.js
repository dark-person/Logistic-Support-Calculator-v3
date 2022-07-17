import React, {useState}from "react"
import './App.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

const fieldLabel = {
    combination: "後勤組合",
    manpower: "人力/次",
    ammo: "彈藥/次",
    ration: "口糧/次",
    part: "零件/次",
    quickRestoration: "快速修理契約",
    quickProduction: "快速製造契約",
    tDollContract: "人形契約",
    equipmentContract: "裝備契約",
    token: "採購幣",
    value: "值",
    totalResource: "資源總量"
}

const getColumnWidth = (rows, accessor, headerText) => {
    const maxWidth = 200
    const magicSpacing = 20
      const cellLength = Math.max(
        ...rows.map(row => (`${row[accessor]}` || '').length),
          headerText.length,
        )
      return Math.min(maxWidth, cellLength * magicSpacing)+1
  }

const getStyleSheet = (raw_data, field_name) =>  {
    if (field_name === 'combination'){
        return {
            width: getColumnWidth(raw_data, field_name, fieldLabel[field_name])
        }
    } else {
        return {
            width: getColumnWidth(raw_data, field_name, fieldLabel[field_name]),
            textAlign: "center"
        }
    }
}

function DataRow({rowData, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){
    return (
        <tr>
            <td>{rowData.combination}</td>
            <td>{rowData.manpower}</td>
            {/* {showManpower && <td>{rowData.manpower}</td>} */}
			<td>{rowData.ammo}</td>
			<td>{rowData.ration}</td>
			<td>{rowData.part}</td>
			<td>{rowData.quickRestoration}</td>
			<td>{rowData.quickProduction}</td>
			<td >{rowData.tDollContract}</td>
			<td>{rowData.equipmentContract}</td>
			<td>{rowData.token}</td>
			<td>{rowData.value}</td>
			<td>{rowData.totalResource}</td>
        </tr>
    )
}

function TableHeader({showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}) {
    return (
        <tr>
            <th>{fieldLabel.combination}</th>
            <th>{fieldLabel.manpower}</th>
            {/* {showManpower && <th>{fieldLabel.manpower}</th>}             */}
            <th>{fieldLabel.ammo}</th>
            <th>{fieldLabel.ration}</th>
            <th>{fieldLabel.part}</th>
            <th>{fieldLabel.quickRestoration}</th>
            <th>{fieldLabel.quickProduction}</th>
            <th>{fieldLabel.tDollContract}</th>
            <th>{fieldLabel.equipmentContract}</th>
            <th>{fieldLabel.token}</th>
            <th>{fieldLabel.value}</th>
            <th>{fieldLabel.totalResource}</th>
        </tr>
    )
}


function ResultArea({data, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){
    return (
        <div className="grid scrollable">
            <Table striped bordered hover size="sm" variant="dark">	
                <thead>
                    <TableHeader showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
                        showQuickRestoration={showQuickRestoration} showQuickProduction={showQuickProduction} 
                        showEquipmentContract={showEquipmentContract} showDollContract={showDollContract} 
                        showToken={showToken} showTotalResource={showTotalResource}
                        showWeightedValue={showWeightedValue}/>
                </thead>
                <tbody>
                    {data.map(item => 
                        <DataRow rowData={item} showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
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
