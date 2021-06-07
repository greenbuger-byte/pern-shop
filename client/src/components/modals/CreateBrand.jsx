import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createBrand} from "../../http/deviceAPi";

const CreateBrand =  ({show, onHide}) => {
    const [name, setName] = useState('');
    const addBrand = () => {
        createBrand(name).then(n=> {
            onHide();
            setName('');
        })
        }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Добавить новый тип</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        name={'name'}
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder={'Название типа'}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary"  onClick={addBrand}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBrand;