import React from 'react';
import {Card, Col, Row, Image} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import {DEVICE_ROUTE} from "../utils/contsts";

const DeviceItem = ({device}) => {
    const history = useHistory();
    return (
        <Col md={3}>
            <Card className={'p-1 text-black-50'} style={{cursor: 'pointer'}}  border={"light"} onClick={()=>history.push(DEVICE_ROUTE+'/'+device.id)}>
                <Image src={`http://localhost:5000/${device.img}`} style={{maxWidth: '100%'}} height={150} alt={device.name}/>
                <Row className={'d-flex direction-column justify-content-center align-items-center'}>
                    <h5 className={'mt-5'}> {device.name}</h5>
                </Row>
                <Row className={'d-flex direction-column justify-content-center align-items-center'}>
                    <h5>{device.price} руб.</h5>
                </Row>


            </Card>

        </Col>
    );
};

export default DeviceItem;