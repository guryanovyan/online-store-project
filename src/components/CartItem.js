import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Image, InputGroup, Row, Form} from "react-bootstrap";
import {Context} from "../index";
import trashCan from '../assets/delete.png'
import {removeFromCart, updateQuantity} from "../http/deviceAPI";
import {observer} from "mobx-react-lite";

const CartItem = observer(({cartDevice}) => {
    const {device} = useContext(Context)
    const [quantity, setQuantity] = useState(cartDevice.quantity)

    useEffect(() => {
        device.setCartDevices(device.cartDevices.map(cd =>
            cd.deviceId === cartDevice.deviceId ? {...cd, quantity} : cd
        ))

        updateQuantity(cartDevice.deviceId, quantity).catch(() => alert('Could not update quantity on server'))
    }, [quantity]);

    const removeItem = () => {
        removeFromCart(cartDevice.device.id).then(() => {
            const updatedCart = device.cartDevices.filter(cd => cd.deviceId !== cartDevice.deviceId)
            device.setCartDevices(updatedCart)
        })
    }

    return (
        <Card className={"mt-3 p-1 position-relative"}>
            <Row className={"w-100"}>
                <Col md={3} className={"col w-auto border-end"}>
                    <Image width={150} height={150} src={'http://localhost:5000/' + cartDevice.device.img} />
                </Col>
                <Col md={9} className={"col w-auto mt-1"}>
                    <div className={"d-flex pe-1"}>
                        <div className={"border-end pe-1"}>
                            {device.types.find(type => type.id === cartDevice.device.typeId).name}
                        </div>
                        <div className={"border-end ps-1 pe-1"}>
                            {device.brands.find(brand => brand.id === cartDevice.device.brandId).name}
                        </div>
                        <div className={"ps-1"}>
                            {cartDevice.device.name}
                        </div>
                    </div>
                    <div className={"pt-4 text-black-50"}>{cartDevice.device.price}€</div>
                    <div className={"d-flex pt-4 align-items-center"}>
                        <div>Quantity:</div>
                        <InputGroup className="ms-2 input-group-sm" style={{width: 150}}>
                            <Button
                                className={"btn-sm"}
                                variant="outline-danger"
                                onClick={() => setQuantity(qty => Math.max(1, qty - 1))}
                            >
                                -
                            </Button>
                            <Form.Control
                                type={"number"}
                                className={"text-center"}
                                value={quantity}
                                onChange={e => setQuantity(Number(e.target.value) >= 1 ? Number(e.target.value) : quantity)}
                            />
                            <Button
                                className={"btn-sm"}
                                variant="outline-success"
                                onClick={() => setQuantity(quantity + 1)}
                            >
                                +
                            </Button>
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <Image src={trashCan}
                   className={"d-flex position-absolute w-auto"}
                   style={{top: 10, right: 10, cursor: "pointer"}}
                   width={24}
                   height={24}
                   onClick={removeItem}
            />
        </Card>
    );
});

export default CartItem;