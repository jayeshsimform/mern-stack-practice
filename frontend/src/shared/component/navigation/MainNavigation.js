import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SideDrawer from './SideDrawer';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import './MainNavigation.css'
import Backdrop from '../UIElement/Backdrop';
const MainNavigation = () => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const toggleDrawerHandler = () => {
        setDrawerIsOpen(!drawerIsOpen);
    };


    return (
        <React.Fragment>
            {drawerIsOpen && <Backdrop onClick={toggleDrawerHandler} />}
            <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler} >
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>
            <MainHeader>
                <button className="main-navigation__menu-btn" onClick={toggleDrawerHandler}>
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    <Link to="/">YourPlaces</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </MainHeader>
        </React.Fragment>
    );
}

export default MainNavigation;