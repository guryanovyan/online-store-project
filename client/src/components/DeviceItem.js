import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import star from '../assets/star.png'
import {useNavigate} from "react-router-dom";
import {DEVICE_ROUTE} from "../utils/const";

const DeviceItem = ({device}) => {
    const navigate = useNavigate();
    return (
        <Col md={3} className={"mt-3 col w-auto"} onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: "pointer"}} border={"light"}>
                <Image width={150} height={150} src={'http://localhost:5000/' + device.img} />
                <div className={"d-flex justify-content-between align-items-center mt-1"}>
                    <div className={"text-black-50"}>
                        {device.price}€
                    </div>
                    <div className={"d-flex align-items-center"}>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;