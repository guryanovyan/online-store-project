import React, {useContext} from 'react';
import {Context} from "../index";
import {Button, Container, Image, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, CART_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/const";
import {observer} from "mobx-react-lite";
import cartImg from '../assets/cart.png'

const NavBar = observer (() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        localStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <NavLink style={{color: 'white', textDecoration: "none"}} to={SHOP_ROUTE}>DeviceShop</NavLink>
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        {user.isAdmin &&
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(ADMIN_ROUTE)}
                            >
                                Admin panel
                            </Button>
                        }
                        <Button
                            variant={"outline-secondary"}
                            className={"ms-2"}
                            onClick={() => navigate(CART_ROUTE)}
                        >
                            <Image src={cartImg} />
                        </Button>
                        <Button
                            variant={"outline-light"}
                            className={"ms-2"}
                            onClick={() => logOut()}
                        >
                            Logout
                        </Button>
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color: 'white'}}>
                        <Button
                            variant={"outline-light"}
                            onClick={() => navigate(LOGIN_ROUTE)}
                        >
                            Authorization
                        </Button>
                    </Nav>
                }
            </Container>
        </Navbar>
    );
});

export default NavBar;