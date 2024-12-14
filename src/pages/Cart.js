import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {fetchBrands, fetchCart, fetchTypes} from "../http/deviceAPI";
import CartItem from "../components/CartItem";
import {observer} from "mobx-react-lite";
import Invoice from "../components/Invoice";

const Cart = observer (() => {
    const {device} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    useEffect(() => {
        fetchCart().then(data => {
            device.setCartDevices(data);
        }).finally(() => setLoading(false));
    }, [device]);

    if(loading){
        return <Spinner animation={"grow"} />
    }

    return (
        <Container>
            <h1 className={"border-bottom pb-1"}>Cart</h1>
            <Row>
                <Col md={8}>
                    {device.cartDevices.length > 0 ?
                        device.cartDevices.map(cartDevice =>
                            <CartItem key={cartDevice.device.id} cartDevice={cartDevice}/>
                        )
                        :
                        <h3 className={"pt-5"}>Your cart is empty</h3>
                    }
                </Col>
                <Col md={4}>
                    <Invoice />
                </Col>
            </Row>
        </Container>

    );
});

export default Cart;