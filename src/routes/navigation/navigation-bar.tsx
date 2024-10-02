import { Link, Outlet } from 'react-router-dom';
import '../../sass/navigation-bar.scss';
import { Button, Navbar } from '@blueprintjs/core';
import billybobjho from '../../assets/billybobjho.png';

export function NavigationBar() {
  return (
    <>
      <Navbar>
        <Navbar.Group>
          <Navbar.Heading
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5em'
            }}
          >
            <img src={billybobjho} alt="Deviljho holding raw meat"></img>
            MH Tribrary
          </Navbar.Heading>
          <Navbar.Divider />
          <Link to="/blade-damage">
            <Button minimal icon="calculator" text="Damage" />
          </Link>
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
