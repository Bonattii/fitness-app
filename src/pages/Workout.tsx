import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiX, HiSearch } from 'react-icons/hi';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import axios from 'axios';

import { zoomIn, staggerContainer } from '../utils/motion';
import { Input, TypingText } from '../components';

const Workout = () => {
  const [haveWorkouts, setHaveWorkouts] = useState(false);
  const [exerciseName, setExerciseName] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [listOfExecises, setListOfExercises] = useState([
    {
      bodyPart: '',
      equipment: '',
      gifUrl: '',
      id: '',
      name: '',
      target: ''
    }
  ]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const parameter = exerciseName.replace(/ /g, '%20').toLowerCase();

    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/name/${parameter.toLowerCase()}`,
      headers: {
        'X-RapidAPI-Key': 'b2077e120emsh760fc651c650520p17d18ejsnac574cf674ca',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    axios
      .request(options)
      .then(response => setListOfExercises(response.data))
      .catch(error => console.log(error));

    setExerciseName('');
  }

  function handleWorkoutName(e: FormEvent) {
    e.preventDefault();

    setWorkoutName('');
  }

  return (
    <div className="h-screen">
      {!haveWorkouts ? (
        <div className="flex justify-center items-center flex-col h-full">
          <Dialog.Root>
            <Dialog.Trigger>
              <motion.button
                variants={zoomIn(0.4, 1)}
                initial="hidden"
                whileInView="show"
                type="button"
                className="flex items-center h-fit py-4 px-6 bg-secondary-blue rounded-[32px] gap-[12px] hover:bg-primary-blue transition text-primary-white text-lg"
              >
                <HiPlus size={25} />
                Create workout
              </motion.button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

              <Dialog.Content className="absolute p-10 mt-12 bg-black border border-secondary-blue rounded-2xl w-full max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <Dialog.Close className="absolute right-6 top-6 text-gray-400 rounded-lg hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary-blue focus:ring-offset-2 focus:ring-offset-secondary-blue">
                  <HiX className="" size={30} aria-label="close" />
                </Dialog.Close>

                <Dialog.Title className="text-3xl text-primary-white leading-tight font-bold mb-2">
                  Create New Workout
                </Dialog.Title>

                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="flex items-center justify-start"
                  >
                    <input
                      name="workoutName"
                      className="w-full p-1 px-2 bg-black border border-secondary-blue rounded-tl-lg rounded-bl-lg border-r-0 placeholder:text-primary-white mt-2 text-primary-white outline-none"
                      placeholder="Search for exercises"
                      value={exerciseName}
                      onChange={e => setExerciseName(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="text-primary-white border border-secondary-blue p-1 border-l-0 mt-2 rounded-tr-lg rounded-br-lg hover:text-secondary-blue"
                    >
                      <HiSearch size={24} />
                    </button>
                  </form>

                  <ScrollArea.Root className="w-full h-[400px] rounded-[4px] overflow-hidden mt-4">
                    <ScrollArea.Viewport className="w-full h-full">
                      <div style={{ padding: '15px 20px' }}>
                        <div className="text-primary-white font-medium text-2xl mb-4">
                          Exercises
                        </div>

                        {listOfExecises[0].name === ''
                          ? null
                          : listOfExecises.map(exercise => (
                              <div
                                key={exercise.id}
                                className="flex justify-between items-center mb-6"
                              >
                                <div className="flex items-center gap-8">
                                  <img
                                    src={exercise.gifUrl}
                                    alt={`${exercise.name} gif`}
                                    className="rounded-full w-[90px] h-[90px]"
                                  />

                                  <div className="text-primary-white pr-8">
                                    <h2 className="capitalize text-xl font-medium mb-2">
                                      {exercise.name}
                                    </h2>
                                    <p className="text-gray-300">
                                      Target: {exercise.target}
                                    </p>
                                  </div>
                                </div>

                                <button
                                  type="button"
                                  className="flex items-center h-fit py-2 px-2 bg-secondary-blue rounded-[32px] gap-[12px] hover:bg-primary-blue transition text-primary-white text-lg"
                                >
                                  <HiPlus size={20} />
                                </button>
                              </div>
                            ))}
                      </div>
                    </ScrollArea.Viewport>

                    <ScrollArea.Scrollbar
                      className="flex p-[2px]"
                      orientation="vertical"
                    >
                      <ScrollArea.Thumb className="flex-1" />
                    </ScrollArea.Scrollbar>

                    <ScrollArea.Scrollbar
                      className="flex p-[2px]"
                      orientation="horizontal"
                    >
                      <ScrollArea.Thumb className="flex-1" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>

                  <form onSubmit={handleWorkoutName} className="mt-4">
                    <Input
                      placeholder="Workout Name"
                      required
                      value={workoutName}
                      onChange={e => setWorkoutName(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="flex items-center h-fit py-4 px-6  bg-secondary-blue rounded-[32px] gap-[12px] hover:bg-primary-blue transition text-primary-white text-lg mt-6 mx-auto"
                    >
                      Create Workout
                    </button>
                  </form>
                </motion.div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      ) : null}
    </div>
  );
};

export default Workout;
