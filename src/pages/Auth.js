import React, {useContext, useState} from 'react';
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/const";
import {checkRole, login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer (() => {
    const location = useLocation();
    const isLogin = location.pathname === LOGIN_ROUTE;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const click = async () => {
        try {
            let data;
            if (isLogin){
                data = await login(email, password);
            } else {
                data = await registration(email, password);
            }
            user.setUser(data);
            user.setIsAuth(true);

            try {
                const isAdmin = await checkRole();
                user.setIsAdmin(isAdmin);
                console.log(user.isAdmin)

            } catch {
                user.setIsAdmin(false);
            }

            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container className={"d-flex justify-content-center align-items-center"} style={{height: window.innerHeight - 54}}>
            <Card className={"p-5"} style={{width: 600}}>
                <h2 className={"m-auto"}>{isLogin ? "Authorization" : "Registration"}</h2>
                <Form className={"d-flex flex-column"}>
                    <Form.Control
                        className={"mt-3"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder={"Enter email..."}
                    />
                    <Form.Control
                        className={"mt-3"}
                        type={"password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder={"Enter password..."}
                    />
                    <Row className={"d-flex justify-content-between mt-3"}>
                        <Col xs="auto">
                            {isLogin ?
                                <div>
                                    Don't have an account? <NavLink to={REGISTRATION_ROUTE}>Register!</NavLink>
                                </div>
                                :
                                <div>
                                    Have an account? <NavLink to={LOGIN_ROUTE}>Login!</NavLink>
                                </div>
                            }
                        </Col>
                        <Col xs="auto">
                            <Button
                                variant={"outline-success"}
                                onClick={click}
                            >
                                {isLogin ? "Login" : "Register"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;