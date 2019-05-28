import React, { Component } from 'react';
import logo from '../assets/logogram.jpg';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top py-5">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        <img src={logo} className="app-logo" alt=""/>
                    </a>
                    <div className="text-right media-social">
                        <a href="https://www.linkedin.com/in/alfathony/" target="_blank"><i class="fa fa-lg fa-linkedin mr-3"></i></a>
                        <a href="https://medium.com/@alfathony" target="_blank"><i class="fa fa-lg fa-medium mr-3"></i></a>
                        <a href="https://www.behance.net/alfathony" target="_blank"><i class="fa fa-lg fa-behance mr-3"></i></a>
                        {/* <a href="#" target="_blank"><i class="fa fa-lg fa-dribbble mr-3"></i></a> */}
                        <a href="https://github.com/alfathony" target="_blank"><i class="fa fa-lg fa-github mr-3"></i></a>
                        <a href="https://twitter.com/alfathony_" target="_blank"><i class="fa fa-lg fa-twitter-square mr-3"></i></a>
                        <a href="https://www.instagram.com/alfathony/" target="_blank"><i class="fa fa-lg fa-instagram mr-3"></i></a>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;