import React, {useContext, useEffect, useState} from "react";
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observe} from "mobx";
import {check} from "./http/userApi";
import {Context} from "./index";
import {Container} from "react-bootstrap";

const App =() => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(Context);
  useEffect(()=>{
    check().then(data=>{
      user.setIsAuth(true);
      user.setUser(data);
    }).finally(()=> setIsLoading(false)
    );
  }, [])
  if(isLoading) return <p>LOADING</p>;
  return ( <React.Fragment>
      <NavBar/>
      <Container style={{minHeight: '70vh', margin: 'auto', width: '1200px', marginTop: '30px'}}>
        <AppRouter/>
      </Container>
      </React.Fragment>
        )
}
export default App;
