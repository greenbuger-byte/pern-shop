import React, {useContext, useState} from 'react';
import {Container, Form, Card, Button, Row} from "react-bootstrap";
import {useHistory, useLocation} from 'react-router-dom';
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/contsts";
import {login, registration} from "../http/userApi";
import {Context} from "../index";

const Auth = () => {
    const {user} = useContext(Context);
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const history = useHistory();
    const signIn = async () => {
        try{
            let response = {};
            if(isLogin){
                response = await login(email, password);
            }else{
                response = await registration(email, password);
            }
            user.setUser = response;
            user.setIsAuth(true);
            history.push(SHOP_ROUTE);
        }catch (e){
            alert(e.response.data.message);
        }
    }
    return (
        <Container className={'d-flex justify-content-center align-items-center'}>
           <Card style={{width: '400px'}} className={'p-5'}>
               <h2 className={'mt-2 m-auto'}>{isLogin ? 'Вход' : 'Регистрация' }</h2>
               <Form className={'d-flex flex-column'}>
                   <Form.Control
                       className={'mt-2 '}
                       value={email}
                       onChange={(e)=>setEmail(e.target.value)}
                       placeholder={'Введите email'}/>
                   <Form.Control
                       type={'password'}
                       value={password}
                       onChange={(e)=>setPassword(e.target.value)}
                       className={'mt-2 '}
                       placeholder={'Введите пароль'}/>
                   <Row className={'d-flex m-2 align-items-center justify-content-between'}
                        >
                      {isLogin ?
                          <div>Нет аккаунта? <br/>
                              <NavLink to={REGISTRATION_ROUTE}>Регистрация</NavLink>
                          </div>
                          :
                          <div>Есть аккунт? <br/>
                              <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
                          </div>
                      }
                       {isLogin ?
                           <Button variant={'outline-info'} onClick={signIn} className={' align-self-end '} >Войти</Button>
                           :
                           <Button variant={'outline-info'}  onClick={signIn}  className={' align-self-end '} >Регистрация</Button>
                       }
                   </Row>

               </Form>
           </Card>
        </Container>
    );
};

export default Auth;