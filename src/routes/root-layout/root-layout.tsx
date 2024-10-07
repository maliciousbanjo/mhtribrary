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
      <div className="content-wrapper">
        <div id="content">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}
