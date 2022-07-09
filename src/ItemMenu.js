import React from "react";
import './App.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import { defaults } from "gh-pages";

function ItemMenu(props) {
    return <div></div>
}

function ItemMeunCol(props) {
    return (
        <Col xs={true} className="mb-2">
            <ItemMenu {...props}></ItemMenu>
        </Col>
    )
}

export default ItemMeunCol