import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {NavDropdown, Container, Navbar, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import { inject, observer } from 'mobx-react';
import { API_URL } from '../config/app';
import axios from 'axios';
import {toJS} from 'mobx';

const Layout = (props) => {
    console.log(props);
    const [user, setUser] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        console.log(toJS('Bearer ' + props.AuthStore.appState?.user?.access_token));
        //axios.post(`${API_URL}/api/authenticate`,{},{
        axios.post(`${API_URL}/api/authenticate`,{},{
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        }).then((res) => {
            
            if(!res.data.isLoggedIn){
                navigate("/login");
            }
            setUser(res.data.user);
            setIsLoggedIn(res.data.isLoggedIn);
        }).catch(e => {
            console.log(e.response);
            console.log(e.request);
            console.log(e.message);
        })
    }, []);

    const logout = async () => {
        axios.post(`${API_URL}/api/logout`,{},{
            headers:{
                Authorization: 'Bearer ' + props.AuthStore.appState?.user?.access_token
            }
        });

        await props.AuthStore.remove();
        navigate("/login");
    }

    return <>   
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <LinkContainer to="/">
                            <Navbar.Brand href="#home">Müşteri Talep</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                             <Nav.Link href="/home">Yönetim Paneli</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/create-demand">
                             <Nav.Link href="/create-demand">Talep Oluştur</Nav.Link>
                        </LinkContainer>

                        <NavDropdown title={user.name} id="collasible-nav-dropdown">
                        <LinkContainer to="/profil">
                             <NavDropdown.Item href="#action/3.1">Profilim</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logout}>Çıkış</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                          
                        </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">{user.name}</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                      
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>
 
            {props.children}
           </>
}

export default inject("AuthStore")(observer(Layout));