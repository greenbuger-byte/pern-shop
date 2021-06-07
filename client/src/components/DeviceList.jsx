import React from 'react';
import DeviceItem from "./DeviceItem";
import {Row} from 'react-bootstrap'

const DeviceList = ({devices}) => {

    return (
        <Row className={'d-flex'}>
            {devices.map(device=>(<DeviceItem key={device.id} device={device}/> ))  }
        </Row>
    );
}

export default DeviceList;