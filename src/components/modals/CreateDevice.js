import React, {useContext, useEffect, useState} from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {createDevice, fetchBrands, fetchDevices, fetchTypes} from "../../http/deviceAPI";

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, []);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}])
    }
    const removeInfo = (number) => {
        setInfo(info.filter(i => i.number !== number))
    }
    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]:value} : i))
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('typeId', device.selectedType.id);
        formData.append('brandId', device.selectedBrand.id);
        formData.append('info', JSON.stringify(info));
        createDevice(formData).then(data => onHide());
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
            size="lg"
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{device.selectedType.name || "Choose type"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type =>
                                <Dropdown.Item
                                    key={type.id}
                                    onClick={() => device.setSelectedType(type)}
                                >
                                    {type.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={"mt-2 mb-2"}>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Choose brand"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand =>
                                <Dropdown.Item
                                    key={brand.id}
                                    onClick={() => device.setSelectedBrand(brand)}
                                >
                                    {brand.name}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className={"mt-3"}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder={"Enter device name..."}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"number"}
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        placeholder={"0.00€"}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"file"}
                        onChange={e => setFile(e.target.files[0])}
                        placeholder={"Add image"}
                    />
                    <hr/>
                </Form>
                <Button variant={"outline-dark"} onClick={addInfo}>
                    Add new characteristic
                </Button>
                {info.map(i =>
                    <Row key={i.number} className={"mt-4"}>
                        <Col md={4}>
                            <Form.Control
                                value={i.title}
                                onChange={e => changeInfo('title', e.target.value, i.number)}
                                placeholder={"Add characteristic's title"}
                            />
                        </Col>
                        <Col md={6}>
                            <Form.Control
                                value={i.description}
                                onChange={e => changeInfo('description', e.target.value, i.number)}
                                placeholder={"Add description"}
                            />
                        </Col>
                        <Col md={2}>
                            <Button variant={"outline-danger"} onClick={() => removeInfo(i.number)}>
                                Delete
                            </Button>
                        </Col>
                    </Row>
                )}

            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-success"} onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;