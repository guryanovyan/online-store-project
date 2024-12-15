import React, {useContext, useEffect, useState} from 'react';
import {Col, Container, Image, Row, Spinner} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import {useParams} from "react-router-dom";
import {fetchCart, fetchOneDevice} from "../http/deviceAPI";
import {Context} from "../index";
import DevicePageCard from "../components/DevicePageCard";

const DevicePage = () => {
    const [item, setItem] = useState({info:[]})
    const {id} = useParams();
    const {device} = useContext(Context);
    const [loading, setLoading] = useState(false);
    const {user} = useContext(Context)

    useEffect(() => {
        fetchOneDevice(id).then(data => setItem(data))
        if (user.isAuth) {
            setLoading(true)
            fetchCart().then(data => device.setCartDevices(data)).finally(() => setLoading(false));
        }
    }, []);

    if(loading){
        return <Spinner animation={"grow"} />
    }

    return (
        <Container className={"mt-3"}>
            <Row className={"d-flex justify-content-center"}>
                <Col md={4} className={"col w-auto"}>
                    <Image width={300} height={300} src={'http://localhost:5000/' + item.img}/>
                </Col>
                <Col md={4} className={"сol w-auto"}>
                    <Row className={"d-flex flex-column text-center align-items-center"}>
                        <h2>{item.name}</h2>
                        <div
                            className={"d-flex align-items-center justify-content-center"}
                            style={{background: `url(${bigStar}) no-repeat center center`, width: 250, height: 240, backgroundSize: "cover", fontSize: 64}}
                        >
                            {item.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4} className={"col w-auto"}>
                    <DevicePageCard id={id} item={item} />
                </Col>
            </Row>
            <Row className={"d-flex flex-column m-3"}>
                <h1>Characteristics:</h1>
                {item.info.map((info, index) =>
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