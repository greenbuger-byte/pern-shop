import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import {createType} from "../../http/deviceAPi";

const CreateType = ({show, onHide}) => {
    const [name, setName] = useState('');
    const addType = () => {
        createType(name).then(n=>onHide());
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
                        onChange = {(e)=>setName(e.target.value)}
                        placeholder={'Название типа'}/>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Закрыть
                </Button>
                <Button variant="primary"  onClick={addType}>
                    Добавить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;