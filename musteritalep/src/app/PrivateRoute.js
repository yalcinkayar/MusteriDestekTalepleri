import React from 'react';
import AuthStore from '../store/AuthStore';
import {Navigate} from 'react-router-dom';

AuthStore.get();
const isLoggedIn = AuthStore.appstate != null && AuthStore.appstate.isLoggedIn;

const PrivateRoute = ({ component: Component }) => {
    return isLoggedIn  ? <Component /> : <Navigate to={{pathname:'/login'}} /> ;
  }
  export default PrivateRoute;
/*const withRouter = ({
    children,
    isLoggedIn,
    ...rest
}) => (
    <Route {...rest}
    render={
        ({location}) => (
            isLoggedIn
            ? 
            (children)
            :
            (<Navigate to={{pathname:'/login'}} />)
        )
    }
    />
)
export default withRouter;

/*const withRouter = ({
    component: Component,
    path,
    ...rest
}) => (
    <Route path={path} {...rest}
    render={
        props => isLoggedIn ? (
            <>
            <Component {...props} />
            </>
        )
        :
        (
            <Navigate to={{pathname:'/login'}} /> //girise yönlendir
            //Redirect
        )
    }
    />
)
export default withRouter;
*/