import React, {useContext, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import Pages from "../components/Pages";
import {Context} from "../index";
import {fetchBrand, fetchDevice, fetchType} from "../http/deviceAPi";
import {observer} from "mobx-react-lite";


const Shop = observer( () => {
    const {device} = useContext(Context);
    useEffect( () => {
        fetchDevice(device.selectedType.id || null, device.selectedBrand.id || null, device.page,device.limit).then(data=>{
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
        fetchType().then(data=>device.setTypes(data));
        fetchBrand().then(data=>device.setBrands(data));
    }, [device.page, device.selectedType, device.selectedBrand]);
    return (
        <Container>
            <Row>
                <Col md={3}>
                    <TypeBar types={device.types} selectedType={device.selectedType} setSelectedType={(type)=>device.setSelectedType(type)}/>
                </Col>
                <Col md={9}>
                    <BrandBar brands={device.brands} selectedBrand={device.selectedBrand} setSelectedBrand={(brand)=>device.setSelectedBrand(brand)}/>
                    <DeviceList devices={device.devices}/>
                    <Pages/>
                </Col>
            </Row>

        </Container>
    );
})

export default Shop;