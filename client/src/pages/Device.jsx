import React, {useEffect, useState} from 'react';
import {Container, Image, Col, Row, Card, Button} from "react-bootstrap";
import {fetchOneDevice} from "../http/deviceAPi";
import {useParams} from 'react-router-dom';
const Device = () => {
    const [device, setDevice] = useState({info:[]});
    const params = useParams();
    useEffect( () =>{
        fetchOneDevice(params.id).then(d => {
            setDevice(d)
        })
    }, [])
    const deviceInfo = [
        {id:1, title: "Количество камер", description: 3},
        {id:2, title: "Система", description: 'IOS'},
        {id:3, title: "Память", description: '64Gb'}
    ]
    if(!device.name) return <div>LOADING</div>
    return (
        <Container>
            <Row>
            <Col md={4}>
                <Image width={300} height={300} src={`${process.env.REACT_APP_API_URL}/${device.img}`} />
            </Col>
            <Col md={4}>
                <Row className={'d-flex flex-column p-2'}>
                    <h3>{device.name}</h3>
                    <div className={'mt-4'} style={{borderTop: '1px solid #ccc'}}>
                    <h5 className={'mt-3'}> Характеристики</h5>
                    {
                        device.info.map((info, index)=>{
                       return     <Row
                           key={info.id}
                           className={'p-2 mt-1'}
                           style={{background: index %2===0? 'lightgray' : 'white'}}>
                                {info.title} : {info.description}
                            </Row>
                        })
                    }
                    </div>
                </Row>
            </Col>
            <Col md={4}>
                <Card className={'d-flex flex-column p-2 align-items-center'}>
                    <h3>{device.price} руб.</h3>
                    <Button variant={"outline-dark"}>Добавить в корзину</Button>
                </Card>
            </Col>
            </Row>
        </Container>
    );
};

export default Device;