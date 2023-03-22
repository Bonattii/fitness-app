import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '../components';

const Default = () => {
  return (
    <div className="bg-black overflow-hidden">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Default;
