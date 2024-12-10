import {Routes, Route, Navigate} from "react-router-dom";
import React, {useContext} from 'react';
import {adminRoutes, authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/const";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);
    return (
        <Routes>
            {user.isAdmin && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />} />
            )}
            <Route path={'*'} element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;