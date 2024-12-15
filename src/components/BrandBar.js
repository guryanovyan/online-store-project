import React, {useContext} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Card, Col, Row} from "react-bootstrap";

const BrandBar = observer (() => {
    const {device} = useContext(Context);
    return (
        <Row className={"d-flex"}>
            {device.brands.map(brand =>
                <Col key={brand.id}>
                    <Card
                        className={"p-3"}
                        onClick={() => brand.id === device.selectedBrand.id ? device.setSelectedBrand({}) : device.setSelectedBrand(brand)}
                        border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                        style={{cursor: "pointer"}}
                    >
                        {brand.name}
                    </Card>
                </Col>
            )}
        </Row>
    );
});

export default BrandBar;