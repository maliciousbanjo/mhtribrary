import { Button, Icon, Navbar } from '@blueprintjs/core';
import { Link } from 'react-router-dom';
import billybobjho from '../../assets/billybobjho.png';
import '../../sass/base-rules.scss';

export function NavigationBar() {
  return (
    <Navbar>
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
        <div className="warning-banner">
          This site is in beta. If you see a problem please contact the
          developer <Icon icon="arrow-right" />
        </div>
        <Link to="/about">
          <Button minimal icon="help" text="About/FAQ" />
        </Link>{' '}
      </Navbar.Group>
    </Navbar>
  );
}
