﻿import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export class NavMenu extends Component {
  displayName = NavMenu.name

  render() {
    return (
      <Navbar inverse fixedTop fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to={'/'}>BookingRoomTask</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to={'/events_list'}>
              <NavItem>
                <Glyphicon glyph='star' /> План событий
              </NavItem>
            </LinkContainer> 
            <LinkContainer to={'/'} exact>
              <NavItem>
                <Glyphicon glyph='home' /> Комнаты
              </NavItem>
            </LinkContainer>
            <LinkContainer to={'/list_users'}>
              <NavItem>
                 <Glyphicon glyph='education' /> Пользователи
              </NavItem>
            </LinkContainer> 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
