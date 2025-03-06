import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';

const Layout = () => {
  const location = useLocation();
  const noLayoutPaths = ['/loginsignup', '/signup']; 

  return (
    <>
      {!noLayoutPaths.includes(location.pathname) && <Navbar/>}
      <Outlet />
      {!noLayoutPaths.includes(location.pathname) && <Footer />}
    </>
  );
};

export default Layout;