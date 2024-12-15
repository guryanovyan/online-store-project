import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Dropdown} from "react-bootstrap";
import {CART_ROUTE} from "../utils/const";
import {deviceToCart, fetchRating, rateDevice} from "../http/deviceAPI";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";

const DevicePageCard = ({id, item}) => {
    const {device, user} = useContext(Context);
    const navigate = useNavigate();
    const [rating, setRating] = useState(0)
    const [rated, setRated] = useState(false);

    useEffect(() => {
        if(user.isAuth) {
            fetchRating(id).then(data => {
                if (data) {
                    setRated(true);
                    setRating(data.rate);
                }
            })
        }
    }, [id, user.isAuth, rating]);

    const isInCart = device.cartDevices.some(cd => cd.deviceId === Number(id));
    const hasBought = user.boughtDevices.some(bd => bd === Number(id));

    const addToCart = () => {
        deviceToCart({deviceId: id}).then(() => navigate(CART_ROUTE));
    }

    const rate = () => {
        rateDevice(id, rating).then(() => {
            setRated(true)
        })
    }

    return (
        <Card
            className={"d-flex align-items-center justify-content-around"}
            style={{width: 300, height: 300, fontSize:32, border: "5px solid lightgrey"}}
        >
            <h3>From: {item.price} €</h3>
            {!user.isAuth ?
                <h4 className={"text-center"}>Authorize to be able to add to cart</h4>
            :
                <>
                    {rated &&
                        <h4 className={"text-center"}>Your rate is {rating}</h4>
                    }

                    {!isInCart ?
                        <Button variant={"outline-dark"} onClick={addToCart}>Add to cart</Button>
                        :
                        <div className={"d-flex flex-column"}>
                            <Button variant={"secondary"} className={"mb-2"} onClick={() => navigate(CART_ROUTE)}>
                                Already in cart
                            </Button>
                        </div>
                    }

                    {hasBought && !rated &&
                        <div className={"d-inline-flex align-items-center"}>
                            <Dropdown className={"d-flex"}>
                                <Dropdown.Toggle variant={"warning"}>{rating || 'Rate'}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {[1, 2, 3, 4, 5].map(item =>
                                        <Dropdown.Item
                                            key={item}
                                            onClick={() => setRating(item)}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            {rating > 0 &&
                                <Button
                                    variant={"outline-success"}
                                    className={"ms-3"}
                                    onClick={rate}
                                >
                                    Ok
                                </Button>
                            }
                        </div>
                    }
                </>
            }
        </Card>
    );
};

export default DevicePageCard;