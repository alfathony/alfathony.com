import React, { Component } from 'react';
import logo from '../assets/logo.svg';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light">
                <div className="container justify-content-center">
                    <a className="navbar-brand" href="#">
                        <img src={logo} className="app-logo" alt=""/>
                    </a>
                    <div className="text-center">
                        alfathony.com
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;