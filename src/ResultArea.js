import React, {useEffect, useState}from "react"
import './App.css'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'

import * as table_utils from './tableUtils.js'

// Order CONST
const SORT_NOT_ALLOW = -1
const SORT_NONE = 0
const SORT_DESC = 1
const SORT_ASEC = 2

function DataRow({rowData, styleObj, showField, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){
    return (
        <tr className="d-flex">
            {
                Object.keys(table_utils.fieldLabel).map((item) => {
                    if (showField[item]) {
                        return <td style={styleObj[item]}>{rowData[item]}</td>
                    } else {
                        return <></>
                    }
                })
            }
        </tr>

        // <tr className="d-flex">
        //     <td style={styleObj.combination}>{rowData.combination}</td>
        //     {showManpower && <td style={styleObj.manpower}>{rowData.manpower}</td>}
		// 	{showAmmo && <td style={styleObj.ammo}>{rowData.ammo}</td>}
		// 	{showRation && <td style={styleObj.ration}>{rowData.ration}</td>}
		// 	{showPart && <td style={styleObj.part}>{rowData.part}</td>}
		// 	{showQuickRestoration && <td style={styleObj.quickRestoration}>{rowData.quickRestoration}</td>}
		// 	{showQuickProduction && <td style={styleObj.quickProduction}>{rowData.quickProduction}</td>}
		// 	{showDollContract && <td style={styleObj.tDollContract}>{rowData.tDollContract}</td>}
		// 	{showEquipmentContract && <td style={styleObj.equipmentContract}>{rowData.equipmentContract}</td>}
		// 	{showToken && <td style={styleObj.token}>{rowData.token}</td>}
		// 	{showWeightedValue && <td style={styleObj.value}>{rowData.value}</td>}
		// 	{showTotalResource && <td style={styleObj.totalResource}>{rowData.totalResource}</td>}
        // </tr>
    )
}

function TableHeader({styleObj, showField, onClick, order}) {
    return (
        <tr className="d-flex">
            {
                Object.keys(table_utils.fieldLabel).map((item) => {
                    if (showField[item]) {
                        return <td style={styleObj[item]} onClick={e => onClick(item)} className={order[item] === SORT_NONE ? "normal" : "hightlight"}>
                            {table_utils.fieldLabel[item]}
                            {order[item] === SORT_ASEC ? "▲" : order[item] === SORT_DESC ? "▼" : ""}
                            </td>
                    } else {
                        return <></>
                    }
                })
            }
        </tr>
    )
}


function ResultArea({data, styleObj, showManpower, showAmmo, showRation, showPart, 
    showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, 
    showTotalResource, showWeightedValue}){

    const defaultSort  = {
        combination: SORT_NONE,
        manpower: SORT_NONE,
        ammo: SORT_NONE,
        ration: SORT_NONE,
        part : SORT_NONE,
        quickRestoration: SORT_NONE,
        quickProduction : SORT_NONE,
        equipmentContract: SORT_NONE,
        tDollContract: SORT_NONE,
        token: SORT_NONE,
        value: SORT_NONE,
        totalResource: SORT_NONE
    }
    
    const [localData, setLocalData] = useState([])

    const [showField, setShowField] = useState({})
    const [sortOrder, setSortOrder] = useState({
        ...defaultSort,
        value : SORT_DESC,
    })

    // onLoad
    useEffect(() => {
        setLocalData(data)
        // Const Object for tidy parse
        setShowField({
            combination: true,
            manpower: showManpower,
            ammo: showAmmo,
            ration: showRation,
            part : showPart,
            quickRestoration: showQuickRestoration,
            quickProduction : showQuickProduction,
            equipmentContract: showEquipmentContract,
            tDollContract: showDollContract,
            token: showToken,
            value: showWeightedValue,
            totalResource: showTotalResource
        })

        //console.log("Local Set")
    }, [data,
        showManpower, showAmmo, showRation, showPart, showQuickRestoration, showQuickProduction, showEquipmentContract, showDollContract, showToken, showWeightedValue, showTotalResource])
                
    function headerClick(item) {

        if (item === "combination") {
            return
        }

        console.log("Header Clicked :",item)
        
        let currentOrder = sortOrder[item]
        console.log("Sort Order Now :",currentOrder)

        let newItemOrder = currentOrder === SORT_NONE ? SORT_DESC : 
                            (currentOrder === SORT_DESC ? SORT_ASEC : 
                                currentOrder === SORT_ASEC ? SORT_NONE: SORT_NOT_ALLOW)

        setSortOrder({
            ...defaultSort,
            [item] : newItemOrder
        })
    }

    return (
        <div className="grid scrollable">
            <Table striped bordered hover size="sm" variant="dark">	
                <thead>
                    <TableHeader styleObj={styleObj} showField={showField} onClick={headerClick} order={sortOrder}/>
                </thead>
                <tbody>
                    {localData.map((item, index) => 
                        <DataRow key={"data-"+index} rowData={item} styleObj={styleObj} showField={showField}
                        showManpower={showManpower} showAmmo={showAmmo} showRation={showRation} showPart={showPart} 
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
