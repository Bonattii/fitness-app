import React from 'react';

import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

import { images } from '../constants';
import { Link } from 'react-router-dom';

interface ExploreCardProps {
  id: string;
  imgUrl: string;
  title: string;
  index: number;
  active: string;
  handleClick: any;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick
}) => (
  <motion.div
    variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
    className={`relative ${
      active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
    } flex items-center justify-center min-w-[170px] h-[700px] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt={title}
      className="absolute w-full h-full object-cover rounded-[24px]"
    />

    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-primary-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px]">
        <Link
          to="/workout"
          className="flex justify-center items-center w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px] hover:bg-secondary-blue"
        >
          <img
            src={images.dumbbell}
            alt="dumbbell"
            className="w-1/2 h-1/2 object-contain"
          />
        </Link>

        <p className="font-normal text-[16px] leading-[20px] text-white uppercase">
          Join BeFit Today
        </p>

        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-primary-white">
          {title}
        </h2>
      </div>
    )}
  </motion.div>
);

export default ExploreCard;
