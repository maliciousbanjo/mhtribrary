import { Button, Classes, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import React from 'react';

export function NavigationBar() {
  const [sideNavOpen, setSideNavOpen] = React.useState(false);

  const onMenuClick = React.useCallback(() => {
    setSideNavOpen(prev => !prev);
  }, []);

  return (
    <div className="navigation">
      <Navbar className="top-navbar">
        <Navbar.Group className="navigation__header" align="left">
          <Button
            className="menu-button"
            icon="menu"
            minimal
            onClick={onMenuClick}
          />
          <Navbar.Heading
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.2em'
            }}
          >
            <img
              src={'/billybobjho_lg.png'}
              width={50}
              alt="Deviljho holding raw meat"
            ></img>
            MH Tribrary
          </Navbar.Heading>
        </Navbar.Group>
        <Navbar.Group className="top-navbar__page-buttons">
          <Navbar.Divider />
          <Link to="/blade-damage">
            <Button minimal icon="calculator" text="Damage" />
          </Link>
        </Navbar.Group>
        <Navbar.Group className="top-navbar__extra" align="right">
          <Link to="/about">
            <Button minimal icon="help" text="About/FAQ" />
          </Link>
        </Navbar.Group>
      </Navbar>
      <div
        className={classNames([
          'sidenav',
          { 'sidenav--open': sideNavOpen },
          Classes.ELEVATION_1
        ])}
      >
        <div className="sidenav__content">
          <Link to="/blade-damage">
            <Button
              className="sidenav__button"
              minimal
              icon="calculator"
              text="Damage"
              onClick={onMenuClick}
            />
          </Link>
          <Link to="/about">
            <Button
              className="sidenav__button"
              minimal
              icon="help"
              text="About/FAQ"
              onClick={onMenuClick}
            />
          </Link>
        </div>
      </div>
      <div className="warning-banner">
        This site is in beta. Please contact the developer with issues.
      </div>
    </div>
  );
}
