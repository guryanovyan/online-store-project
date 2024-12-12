import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useNavigate, useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import {deviceToCart} from "../http/deviceAPI";
import {CART_ROUTE} from "../utils/const";

const DevicePage = () => {
    const [device, setDevice] = useState({info:[]})
    const {id} = useParams();
    const {user} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, []);

    const addToCart = () => {
        deviceToCart({deviceId: id}).then(() => navigate(CART_ROUTE));
    }

    return (
        <Container className={"mt-3"}>
            <Row className={"d-flex justify-content-center"}>
                <Col md={4} className={"col w-auto"}>
                    <Image width={300} height={300} src={'http://localhost:5000/' + device.img}/>
                </Col>
                <Col md={4} className={"сol w-auto"}>
                    <Row className={"d-flex flex-column text-center align-items-center"}>
                        <h2>{device.name}</h2>
                        <div
                            className={"d-flex align-items-center justify-content-center"}
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 250, height: 240, backgroundSize: "cover", fontSize: 64}}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4} className={"col w-auto"}>
                    <Card
                        className={"d-flex align-items-center justify-content-around"}
                        style={{width: 300, height: 300, fontSize:32, border: "5px solid lightgrey"}}
                    >
                        <h3>From: {device.price} €</h3>
                        {user.isAuth ?
                            <Button
                                variant={"outline-dark"}
                                onClick={addToCart}
                            >
                                Add to cart
                            </Button>
                        :
                            <h4 className={"text-center"}>
                                Authorize to be able to add to cart
                            </h4>
                        }
                    </Card>
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h1>Characteristics:</h1>
                {device.info.map((info, index) =>
                    <Row
                        key={info.id}
                        style={{background: index % 2 === 0 ? "lightgray" : "transparent", padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;