import React, {useContext, useEffect, useState} from 'react';
import {Card, Col, Container, Row, Spinner} from "react-bootstrap";
import {Context} from "../index";
import {fetchBrands, fetchCart, fetchTypes} from "../http/deviceAPI";
import CartItem from "../components/CartItem";
import {observer} from "mobx-react-lite";

const Cart = observer (() => {
    const {device} = useContext(Context);
    const [loading, setLoading] = useState(true); // Состояние загрузки

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    useEffect(() => {
        fetchCart().then(data => {
            device.setCartDevices(data)
        }).finally(() => setLoading(false));
    }, [device]);

    if(loading){
        return <Spinner animation={"grow"} />
    }

    const getPrices = () => {
        let price = 0;
        device.cartDevices.map(cartDevice => {
            price += Number(cartDevice.device.price)
        })
        return price;
    }

    return (
        <Container>
            <h1 className={"border-bottom pb-1"}>Cart</h1>
            <Row>
                <Col md={8}>
                    {device.cartDevices.length > 0 ?
                        device.cartDevices.map(cartDevice =>
                            <CartItem key={cartDevice.device.id} cartDevice={cartDevice.device}/>
                        )
                        :
                        <h3 className={"pt-5"}>Your cart is empty</h3>
                    }
                </Col>
                <Col md={4}>
                    <Card className={"mt-3 p-3"} style={{height: 400}}>
                        <h3 className={"border-bottom pb-1"}>Invoice</h3>
                        <div>Total amount:</div>
                        <div>{getPrices()}€</div>
                    </Card>
                </Col>
            </Row>
        </Container>

    );
});

export default Cart;