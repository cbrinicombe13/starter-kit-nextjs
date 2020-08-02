import React, { useState, useEffect } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';
import Link from 'next/link';
import Router from 'next/router';
import { APP_NAME } from '../../config';
import { signout, isAuth } from '../../actions/auth';

const Header = () => {

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Nav className="mr-auto" navbar>
                    {!isAuth() && (
                        <>
                            <NavItem>
                                <Link href="/signin">
                                    <NavLink>Sign In</NavLink>
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link href="/signup">
                                    <NavLink>Sign Up</NavLink>
                                </Link>
                            </NavItem>
                        </>
                    )}
                    {isAuth() && (
                        <NavItem>
                            <NavLink onClick={() => signout(() => { Router.replace('/signin') })}>Sign Out</NavLink>
                        </NavItem>
                    )}
                    {isAuth() && (
                        <NavItem>
                            <Link href='/user'>
                                <NavLink>
                                    {`${isAuth().name}'s Dashboard`}
                                </NavLink>
                            </Link>
                        </NavItem>
                    )}
                    {isAuth() && isAuth().role === 1 && (
                        <NavItem>
                            <Link href='/admin'>
                                <NavLink>
                                    Control Panel
                                </NavLink>
                            </Link>
                        </NavItem>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;