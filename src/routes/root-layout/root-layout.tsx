import { Outlet } from 'react-router-dom';
import { NavigationBar } from './navigation';
import { Footer } from './footer';
import { Classes } from '@blueprintjs/core';
import classNames from 'classnames';
import React from 'react';

/**
 * Root Layout of this application. Contains navbar, page content, and a footer
 */
export function RootLayout() {
  const [darkMode, setDarkMode] = React.useState(true);
  return (
    <div className={classNames(['root-layout', { [Classes.DARK]: darkMode }])}>
      <NavigationBar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="content-wrapper">
        <div id="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
