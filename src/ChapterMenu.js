import React from "react"
import Col from 'react-bootstrap/Col'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import './App.css'

let data = require("./supportData.json");

function ChapterCheckBox({id, state, handler}){
    return (
        <Form.Check inline type="checkbox"
            checked={state}
            onChange={(e) => handler(e, id)}
            id = {id}
            label={"第"+data.chineseNumber[id]+"戰役"}
        />
    )
}

function ChapterMenu(props){
    return (
        <div className="grid">
            <h2 className="grid-title mb-3">戰役進度</h2>
            <Form>
				{       
					data.chapterList.map(item =>
                        <ChapterCheckBox 
                            id = {item}
                            key= {"ch-check-"+item}
                            handler={props.chapterHandler}
                            state={props.chapterState[item]}
                        />
					)
				}
			</Form>
            <br />
            <Button 
				variant="outline-success"
				onClick={props.selectAllHandler}>
				全選
			</Button> {''}
			<Button 
				variant="outline-secondary"
				onClick={props.clearAllHandler}>
				清空
			</Button>
        </div>
    )
}

function ChapterMenuCol(props){
	return (
        <Col xs={true} className="mb-2">
            <ChapterMenu {...props}/>
        </Col>    
	);
}

export default ChapterMenuCol;