import React from 'react';

import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';

class MyNavbar extends React.Component {
  render(){
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">Shakes & Fidget</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#/">
            Personnages
          </NavItem>
          <NavItem eventKey={2} href="#/tower">
            Tour
          </NavItem>
          <NavItem eventKey={3} href="#/tornado">
            Tornade
          </NavItem>
          <NavDropdown eventKey={4} title="Bâtiments" id="basic-nav-dropdown">
            <MenuItem eventKey={4.1} href="#/castle">Chateau fort</MenuItem>
            <MenuItem eventKey={4.2} href="#/evil">Enfers</MenuItem>
          </NavDropdown>
          <NavItem eventKey={5} href="#/devilsPortal">
            Portail des démons
          </NavItem>
          <NavItem eventKey={6} href="#/pets">
            Familiers
          </NavItem>
          <NavItem eventKey={6} href="#/dungeons">
            Donjons
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default MyNavbar;
