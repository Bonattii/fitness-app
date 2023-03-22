import { motion } from 'framer-motion';

import { images } from '../constants';
import { staggerContainer, fadeIn } from '../utils/motion';
import { TypingText } from './CustomTexts';

const About = () => {
  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12 relative z-10">
      <div className="gradient-02 z-0" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex justify-center items-center flex-col"
      >
        <TypingText title="| About BeFit" textStyles="text-center" />

        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          className="mt-[8px] font-normal sm:text-[32px] text-[20px] text-center text-primary-white"
        >
          <span className="font-extrabold text-white">BeFit </span>is a new
          thing in the future of the workouts, where you can enjoy the gym by
          feeling like you are under control
          <span className="font-extrabold text-white">
            {' '}
            of your movements{' '}
          </span>{' '}
          and allowing you to{' '}
          <span className="font-extrabold text-white"> track </span> your
          workouts to enable you to{' '}
          <span className="font-extrabold text-white"> improve </span> even
          more!
        </motion.p>

        <a href="#workout">
          <motion.img
            variants={fadeIn('up', 'tween', 0.3, 1)}
            src={images.arrowDown}
            alt="arrow down"
            className="w-[18px] h-[28px] object-contain mt-[28px]"
          />
        </a>
      </motion.div>
    </section>
  );
};

export default About;
