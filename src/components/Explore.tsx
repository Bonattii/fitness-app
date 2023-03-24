import { useState } from 'react';
import { motion } from 'framer-motion';

import { staggerContainer } from '../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../components';
import { images } from '../constants';

const exploreMuscles = [
  {
    id: 'muscle-1',
    imgUrl: images.back,
    title: 'Back'
  },
  {
    id: 'muscle-2',
    imgUrl: images.chest,
    title: 'Chest'
  },
  {
    id: 'muscle-3',
    imgUrl: images.legs,
    title: 'Legs'
  },
  {
    id: 'muscle-4',
    imgUrl: images.arms,
    title: 'Arms'
  },
  {
    id: 'muscle-5',
    imgUrl: images.cardio,
    title: 'Cardio'
  }
];

const Explore = () => {
  const [active, setActive] = useState('muscle-2');

  return (
    <section className="sm:p-16 xs:p-8 px-6 py-12" id="workout">
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="2xl:max-w-[1280px] w-full mx-auto flex flex-col"
      >
        <TypingText title="| Workout" textStyles="text-center" />

        <TitleText
          title={
            <>
              Choose what you
              <br className="md:block hidden" /> want to train
            </>
          }
          textStyles="text-center"
        />

        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreMuscles.map((muscle, index) => (
            <ExploreCard
              key={muscle.id}
              {...muscle}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
