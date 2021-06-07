import React, {useContext} from 'react';
import {Switch, Route} from 'react-router-dom';
import {authRoutes, publicRoutes} from "../routes";
import Error404 from "../pages/Error404";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    console.log(user)
    return (
        <Switch>
            {
             user.isAuth && authRoutes.map(({path, component})=>

                    <Route key={path} path={path} component={component} exact/>

                )
            }
            {
                publicRoutes.map(({path, component})=>
                    <Route key={path} path={path} component={component} exact/>
                )
            }
            <Route component={Error404}/>
        </Switch>
    );
};

export default AppRouter;