import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";
import {fetchType} from "../http/deviceAPi";

const TypeBar = ({types, selectedType, setSelectedType}) => {
    return (
        <ListGroup>
            {
                types.map(type=>{
                return    <ListGroup.Item
                    key={type.id}
                    active = {type.id === selectedType.id}
                    onClick={()=>setSelectedType(type)}
                >
                    {type.name}
                </ListGroup.Item>
                })
            }
        </ListGroup>
    );
}

export default TypeBar;