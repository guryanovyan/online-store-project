import React, {useContext} from 'react';
import {Button, Card} from "react-bootstrap";
import {Context} from "../index";
import {removeFromCart} from "../http/deviceAPI";

const Invoice = () => {
    const {device, user} = useContext(Context);

    const getAmount = () => {
        let price = 0;
        device.cartDevices.map(cartDevice => {
            price += Number(cartDevice.device.price * cartDevice.quantity)
        })
        return price;
    }

    const buy = () => {
        device.cartDevices.map(cd => {
            if(!user.boughtDevices.includes(cd.deviceId)) {
                user.boughtDevices.push(cd.deviceId)
            }
        })
    }

    const removeItems = () => {
        device.cartDevices.map(cd => {
            removeFromCart(cd.deviceId).then(() => {
                device.setCartDevices([])
            })
        })
    }

    return (
        <Card className={"mt-3 p-3 d-flex flex-column"} style={{height: 400}}>
            <h3 className={"border-bottom pb-1"}>Invoice</h3>
            <div>
                {device.cartDevices.map(cd =>
                    <div key={cd.id} className={"fst-italic"}>
                        {cd.device.price}€ × {cd.quantity} = {cd.device.price * cd.quantity}€
                    </div>
                )}
                <div className={"mt-4 border-top"}>Total amount:</div>
                <div>{getAmount()}€</div>
            </div>
            <Button
                variant={"outline-warning"}
                className={"mt-auto"}
                onClick={() => {
                    buy();
                    removeItems();
                }}
            >
                Checkout
            </Button>
        </Card>
    );
};

export default Invoice;