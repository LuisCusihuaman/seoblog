import React, { useState } from 'react';

import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import { APP_NAME } from '../config';
import Link from 'next/link';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="light" light expand="md">
      <Link href="/">
        <NavLink className="navbar-brand font-weight-bold">{APP_NAME}</NavLink>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <Link href="/signin">
              <NavLink>Signin</NavLink>
            </Link>
          </NavItem>
          <NavItem>
            <Link href="/signup">
              <NavLink>Signup</NavLink>
            </Link>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
