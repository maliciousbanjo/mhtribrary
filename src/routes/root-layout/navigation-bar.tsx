import { Button, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import billybobjho from '../../assets/billybobjho.png';

export function NavigationBar() {
  return (
    <>
      <Navbar className="navbar">
        <Navbar.Group align="left">
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
        <Navbar.Group align="right">
          <Link to="/about">
            <Button minimal icon="help" text="About/FAQ" />
          </Link>{' '}
        </Navbar.Group>
      </Navbar>
      <div className="warning-banner">
        This site is in beta. Please contact the developer with issues.
      </div>
    </>
  );
}
