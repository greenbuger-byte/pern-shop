import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";

const Admin = () => {
    const [brandVisible, setBrandVisible] = useState(false);
    const [typeVisible, setTypeVisible] = useState(false);
    const [deviceVisible, setDeviceVisible] = useState(false);

    const createBrand = () => {

    }

    return (
        <Container>
            <Button
                variant={"outline-dark"}
                className={"mt-2"}
                onClick={()=>setTypeVisible(prev=>!prev)}>
                Добавить тип
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-2"}
                onClick={()=>setBrandVisible(prev=>!prev)}>
                Добавить бренд
            </Button>
            <Button
                variant={"outline-dark"}
                className={"mt-2"}
                onClick={()=>setDeviceVisible(prev=>!prev)}>
                Добавить устройство
            </Button>

            <CreateBrand show={brandVisible} onHide={()=>setBrandVisible(false)}/>
            <CreateDevice show={deviceVisible} onHide={()=>setDeviceVisible(false)}/>
            <CreateType show={typeVisible} onHide={()=>setTypeVisible(false)}/>
        </Container>
    );
};

export default Admin;