import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrand, fetchType} from "../../http/deviceAPi";
import {observer} from "mobx-react-lite";


const CreateDevice =  observer( ({show, onHide}) => {
    const {device} = useContext(Context);
    const [info, setInfo] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState();

    useEffect(() => {
        fetchBrand().then(data=>device.setBrands(data));
        fetchType().then(data=>device.setTypes(data));
    },[])

    const add_info = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }

    const removeInfo = (i) => {
        setInfo(info.filter(inf=>i!==inf.number));
    }
    const createInfo = (n, key, value) => {
        setInfo(info.map(i=>( i.number===n ? {...i, [key]:value} : i)));
    }
    const addDevice = () =>{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', `${device.selectedBrand.id}`);
        formData.append('typeId', `${device.selectedType.id}`);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data=>onHide())

    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый девайс</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Col md={6}>
                        <Dropdown style={{width: '100%'}}>
                            <Dropdown.Toggle>{device.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.types.map(type=> <Dropdown.Item
                                    key={type.id}
                                    onClick={()=>device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                        <Col md={6}>
                        <Dropdown style={{width: '100%'}} >
                            <Dropdown.Toggle>{device.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                {device.brands.map(brand=><Dropdown.Item
                                    key={brand.id}
                                    onClick={()=>device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                        </Col>
                    </Row>

                    <Form.Control className={'mt-3'} value={name} onChange={e=>setName(e.target.value)} type={'text'} placeholder={'Добавить название'} />
                    <Form.Control className={'mt-3'} value={price} onChange={e=>setPrice(e.target.value)} type={'number'} placeholder={'Добавить стоимость'} />
                    <Form.Control
                        className={'mt-3'}
                        type={'file'}
                        onChange={e=>setFile(e.target.files[0])}
                        placeholder={'Добавить фаил'}
                    />
                    <Button className={'mt-3 mb-1'} variant={'outline-info'} onClick={add_info}>Добавить новое свойство</Button>
                    {info.map(i=> <Row key={i.number} className={'mt-1'}>
                        <Col md={4}>
                            <Form.Control
                                onChange={(e)=>createInfo(i.number, 'title', e.target.value)}
                                value={i.title} placeholder={'Введите название'}/></Col>
                        <Col md={4}>
                            <Form.Control
                                onChange={(e)=>createInfo(i.number, 'description', e.target.value)}
                                value={i.description}
                                placeholder={'Введите описание'}/>
                        </Col>
                        <Col md={4}>
                            <Button variant={'outline-info'}
                                    onClick={()=>removeInfo(i.number)}>Удалить</Button>
                        </Col>
                    </Row>)}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button onClick={addDevice} variant="primary" >
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;