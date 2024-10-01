import { Outlet } from 'react-router-dom';
import '../../sass/root-page.scss';
import { Button, Navbar } from '@blueprintjs/core';

export function RootPage() {
  return (
    <>
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading>MH Tribrary</Navbar.Heading>
          <Navbar.Divider />
          <Button minimal icon="calculator" text="Damage (not working)" />
        </Navbar.Group>
      </Navbar>
      <div className="wrapper">
        <div id="detail">
          <Outlet />
        </div>
      </div>
    </>
  );
}
