import { Outlet } from 'react-router-dom';
import { NavigationBar } from './navigation-bar';
import { Footer } from './footer';

/**
 * Root Layout of this application. Contains navbar, page content, and a footer
 */
export function RootLayout() {
  return (
    <>
      <NavigationBar />
      <div className="wrapper">
        <div id="detail">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
