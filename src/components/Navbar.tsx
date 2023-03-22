import { useState } from 'react';
import { motion } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { Link, NavLink } from 'react-router-dom';

import { navVariants } from '../utils/motion';
import { images } from '../constants';

const navItems = [
  { name: 'home', href: '/' },
  { name: 'workout', href: '/workout' }
];

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className="sm:px-16 px-6 py-8 relative w-full flex justify-between items-center 2xl:max-w-[1280px] mx-auto"
    >
      {/* <div className="absolute w-[50%] inset-0 gradient-01" /> */}

      <div className="flex justify-start items-center">
        <Link to="/">
          <img
            src={images.logo}
            alt="logo"
            className="w-[90px] h-[20px] lg:w-[180px] lg:h-[40px]"
          />
        </Link>
      </div>

      <ul className="flex-1 md:flex justify-center items-center list-none hidden">
        {navItems.map(item => (
          <li
            key={item.name}
            className="text-[0.8rem] md:text-[1.3rem] lg:text-[1.75rem] text-left text-primary-white leading-[1.5] my-0 mx-auto cursor-pointer hover:text-white"
          >
            <NavLink
              to={item.href}
              className="uppercase font-medium transition ease-in-out"
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="w-[35px] h-[35px] rounded-[50%] relative md:hidden justify-center items-center flex">
        <HiMenuAlt4
          onClick={() => setToggle(true)}
          className="w-[35px] h-[35px] text-white my-[0.5rem]"
        />

        {toggle && (
          <motion.div
            whileInView={{ x: [300, 0] }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
            className={`fixed top-0 bottom-0 right-0 z-20 p-4 w-[80%] h-[100vh] flex justify-end items-end flex-col bg-nav bg-black bg-cover bg-repeat shadow-[0_0_20px_rgba(255,255,255,0.2)] md:hidden`}
          >
            <HiX
              onClick={() => setToggle(false)}
              className="w-[35px] h-[35px] text-primary-white my-[0.5rem] mx-[1rem] cursor-pointer"
            />

            <ul className="list-none m-0 p-0 h-full w-full flex justify-start items-start flex-col">
              {navItems.map(item => (
                <li key={item.name} className="m-4">
                  <NavLink
                    to={item.href}
                    onClick={() => setToggle(false)}
                    className="text-primary-white text-[1.5rem] uppercase font-medium transition ease-in-out hover:text-white"
                  >
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
