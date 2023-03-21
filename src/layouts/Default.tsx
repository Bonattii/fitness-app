import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '../components';

const Default = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Default;
