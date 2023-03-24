import { motion } from 'framer-motion';
import React from 'react';

import { textVariant2, textContainer } from '../utils/motion';

interface TypingTextProps {
  title: string;
  textStyles?: string;
}

interface TitleTextProps {
  title: React.ReactNode;
  textStyles?: string;
}

export const TypingText: React.FC<TypingTextProps> = ({
  title,
  textStyles
}) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-primary-white ${textStyles}`}
  >
    {/* make an array from the word and map trought it to show one by one */}
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === ' ' ? '\u00A0' : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText: React.FC<TitleTextProps> = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-primary-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);
