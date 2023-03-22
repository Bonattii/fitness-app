import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';
import { images } from '../constants';

import { footerVariants } from '../utils/motion';

const socials = [
  {
    name: 'twitter',
    imgUrl: images.twitter,
    url: 'https://twitter.com/bonatti_rodrigo'
  },
  {
    name: 'linkedin',
    imgUrl: images.linkedin,
    url: 'https://linkedin.com/in/rodrigobonatti'
  },
  {
    name: 'instagram',
    imgUrl: images.instagram,
    url: 'https://instagram.com/rodrigobonatti_'
  },
  {
    name: 'facebook',
    imgUrl: images.facebook,
    url: 'https://facebook.com/rodrigobonatti'
  }
];

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className="sm:p-16 xs:p-8 px-6 py-8 relative"
  >
    <div className="footer-gradient" />

    <div className="2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between flex-wrap gap-5">
        <h4 className="font-bold md:text-[64px] text-[44px] text-primary-white">
          Join BeFit Today
        </h4>

        <button
          type="button"
          className="flex items-center h-fit py-4 px-6 bg-secondary-blue rounded-[32px] gap-[12px] hover:bg-primary-blue transition"
        >
          <img
            src={images.dumbbell}
            alt="dumbbell"
            className="w-[24px] h-[24px] object-contain"
          />
          <Link
            to="/workout"
            className="font-normal text-[16px] text-primary-white"
          >
            JOIN BEFIT
          </Link>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-primary-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/"
            className="font-extrabold text-[24px] text-primary-white"
          >
            <img src={images.logo} alt="logo" />
          </Link>

          <p className="font-normal text-[14px] text-white opacity-50">
            Copyright © 2023 BeFit. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social, index) => (
              <a
                key={social.name + index}
                href={social.url}
                target="_blank"
                className="hover:opacity-80"
              >
                <img
                  src={social.imgUrl}
                  alt={social.name}
                  className="w-[24px] h-[24px] object-contain cursor-pointer"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
