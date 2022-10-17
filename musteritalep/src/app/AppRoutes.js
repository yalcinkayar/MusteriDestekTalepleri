import React, {Suspense, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import PrivateRoute from './PrivateRoute';

import Home from './home';
import Login from './login';
import Register from './register';
import Profile from './profile';
import Support from './support';
import Demand from './demand/index';
import DemandDetail from './demand/detail';

const AppRoutes = (props) => {
    useEffect(() => {
       props.AuthStore.get()
    }, [])
    return (
        <Suspense fallback={<div>Fallback</div>}>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/register" element={<Register />} />
            <Route path="/support" element={<Support />} />
            <Route path="/create-demand" element={<Demand />} />
            <Route path="/demand-detail/:id" element={<DemandDetail />} />
        </Routes>

        </Suspense>
    );
};
//component={Home}
export default inject("AuthStore")(observer(AppRoutes));