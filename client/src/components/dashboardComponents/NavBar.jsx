import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import 'mdbreact/dist/css/mdb.css';
class NavbarPage extends Component {


render() {
  return (
    <Router>
      <MDBNavbar color="grey" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">Ticket Tracker</strong>
        </MDBNavbarBrand>
      </MDBNavbar>
    </Router>
    );
  }
}

export default NavbarPage;