import React from 'react';
import { NavLink } from 'react-router-dom';
import {faHome} from 'react-icons/fa';
import {Navbar,Container,Nav} from 'react-bootstrap';

const Layout = (props) => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">mTakip</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <NavLink activeStyle={{color: '#3f51b5', fontWeight: '600'}} className="link" to={"/"}>
                    <faHome />
                    <span>Anasayfa</span>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink activeStyle={{color: '#3f51b5', fontWeight: '600'}} className="link" to={"/profile"}>
                    <faHome />
                    <span>Profilim</span>
                </NavLink>
              </Nav.Link>
              <Nav.Link>
                <NavLink activeStyle={{color: '#3f51b5', fontWeight: '600'}} className="link" to={"/"}>
                    <faHome />
                    <span>Çıkış</span>
                </NavLink>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <main style={{marginBottom:10}}>
            {props.children}
        </main>
      </>
    );
};

export default Layout;