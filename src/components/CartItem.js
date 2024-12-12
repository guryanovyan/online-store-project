import React, {useContext} from 'react';
import {Card, Col, Image, Row} from "react-bootstrap";
import {Context} from "../index";
import trashCan from '../assets/delete.png'
import {removeFromCart} from "../http/deviceAPI";

const CartItem = ({cartDevice}) => {
    const {device} = useContext(Context)

    const removeItem = () => {
        removeFromCart(cartDevice.id).then(() => {
            const updatedCart = device.cartDevices.filter(cd => cd.deviceId !== cartDevice.id)
            device.setCartDevices(updatedCart)
        })
    }

    return (
        <Card className={"mt-3 p-1 position-relative"}>
            <Row className={"w-100"}>
                <Col md={3} className={"col w-auto border-end"}>
                    <Image width={150} height={150} src={'http://localhost:5000/' + cartDevice.img} />
                </Col>
                <Col md={9} className={"col w-auto mt-1"}>
                    <div className={"d-flex pe-1"}>
                        <div className={"border-end pe-1"}>
                            {device.types.find(type => type.id === cartDevice.typeId).name}
                        </div>
                        <div className={"border-end ps-1 pe-1"}>
                            {device.brands.find(brand => brand.id === cartDevice.brandId).name}
                        </div>
                        <div className={"ps-1"}>
                            {cartDevice.name}
                        </div>
                    </div>
                    <div className={"pt-4 text-black-50"}>{cartDevice.price}€</div>
                    <div className={"pt-4"}>Quantity: 1</div>
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
};

export default CartItem;