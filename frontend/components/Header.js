import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, NavbarText } from 'reactstrap';
import { APP_NAME } from '../config';
import Link from 'next/link';
import { isAuth, signout } from '../actions/auth';

const Header = () => {
  //This problem happens because the server loads the component and returns the html but the client changes it and then they don't match
  // It’s because React expects the one rendered on the server should be the same with one rendered on client during hydration. It’s okay to use window type-checking before doing DOM access/operations but make sure it won’t affect rendering difference between client and server.
  const [isBrowser, setIsBrowser] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    process.browser && setIsBrowser(true);
  }, []);

  return (
    <Navbar color="light" light expand="md">
      <Link href="/">
        <NavLink className="navbar-brand font-weight-bold">{APP_NAME}</NavLink>
      </Link>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {isBrowser && !isAuth() && (
            <>
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
            </>
          )}
          {isBrowser && isAuth() && (
            <NavItem>
              <NavLink
                style={{ cursor: 'pointer' }}
                onClick={() => signout(() => Router.replace(`/signin`))}
              >
                Signout
              </NavLink>
            </NavItem>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
