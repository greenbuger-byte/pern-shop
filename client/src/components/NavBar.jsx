import React, {useContext} from 'react';
import {useHistory, NavLink} from "react-router-dom";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/contsts";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const history = useHistory();
    const logOut = ()=>{
        user.setUser({})
        user.setIsAuth(false);
    }
    return (
        <Navbar bg="light" variant="light">
            <Container>
            <Navbar.Brand to="/">
               <NavLink to={SHOP_ROUTE} >
               <img src={'https://x-store.net/bitrix/templates/mi/img/logo.png'}
                    style={{width: '100px'}}
                    alt={'logo'} />
               </NavLink>
            </Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Оплата</Nav.Link>
                    <Nav.Link href="#features">Доставка</Nav.Link>
                    <Nav.Link href="#pricing">Гарантия</Nav.Link>
                    <Nav.Link href="#pricing">Контакты</Nav.Link>
                </Nav>
                {user.isAuth ?
                    <React.Fragment>
                    <Nav className="ml-auto">
                        <Button
                            variant="light"
                            onClick={()=>history.push(ADMIN_ROUTE)}
                        >
                            Админ
                        </Button>
                        <Button
                            variant="light"
                            onClick={logOut}>
                            Выйти
                        </Button>
                    </Nav>
                    </React.Fragment>
                    :
                    <Nav className="ml-auto">
                        <Button
                            variant="light"
                            onClick={()=>history.push(LOGIN_ROUTE)}>
                            Авторизация
                        </Button>
                    </Nav>
                }

            </Container>
        </Navbar>
            );
});

export default NavBar;