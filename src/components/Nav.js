import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo2.png';
import LogoMobile from '../assets/logo-mobile.png';
import Menu from './Menu';

export default class Nav extends Component {
  state = {
    showMenu: false,
  };

  toggleMenu = () => {
    this.setState({
      showMenu: !this.state.showMenu,
    });
  };

  render() {
    return (
      <div>
        <nav className="w-10-ns">
          <Link to="/" title="MILA CRM">
            <img src={Logo} className="" alt="MILA CRM" />
          </Link>
          <div className="">
            <div className="fl-ns">
              <Link to="/profile" title="MILA CRM">
                <img
                  src={LogoMobile}
                  className="dn-ns h3 center pl3 align-middle"
                  alt="MILA CRM"
                />
              </Link>
            </div>
            <div className="dib left-0 fl-ns" onClick={this.toggleMenu}>
              <img
                src={this.props.profileImage}
                className="dn-ns h2 br-100 align-middle pa3"
                alt=""
              />
            </div>
          </div>
        </nav>
        {this.state.showMenu ? <Menu logout={this.props.logout} /> : null}
      </div>
    );
  }
}
