import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiPlus, HiX, HiSearch, HiCheck } from 'react-icons/hi';
import * as Dialog from '@radix-ui/react-dialog';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import * as Checkbox from '@radix-ui/react-checkbox';
import axios from 'axios';

import { zoomIn, staggerContainer } from '../utils/motion';
import { Input, TitleText } from '../components';

const Workout = () => {
  const [exerciseName, setExerciseName] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [showScroll, setShowScroll] = useState(false);
  const [allWorkouts, setAllWorkouts] = useState<
    [
      {
        bodyPart?: string;
        equipment?: string;
        gifUrl?: string;
        id?: string;
        name?: string;
        target?: string;
      }
    ]
  >([{}]);
  const [listOfExecises, setListOfExercises] = useState<
    [
      {
        bodyPart?: string;
        equipment?: string;
        gifUrl?: string;
        id?: string;
        name?: string;
        target?: string;
      }
    ]
  >([{}]);
  const [workoutList, setWorkoutList] = useState([
    {
      workoutName: 'Teste',
      list: [
        {
          bodyPart: 'string',
          equipment: 'string',
          gifUrl: 'String',
          id: 'String',
          name: 'String',
          target: 'String'
        }
      ]
    }
  ]);
  const [workoutIdsList, setWorkoutIdsList] = useState<Array<string>>([]);

  // useEffect(() => {
  //   console.log(workoutList);
  // }, [workoutList]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setShowScroll(true);

    const parameter = exerciseName.replace(/ /g, '%20').toLowerCase();

    const options = {
      method: 'GET',
      url: `https://exercisedb.p.rapidapi.com/exercises/name/${parameter}`,
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

  function handleToggleWorkoutListIds(id: string) {
    if (workoutIdsList.includes(id)) {
      const workoutWithRemovedOne = workoutIdsList.filter(prev => prev !== id);

      setWorkoutIdsList(workoutWithRemovedOne);
    } else {
      const workoutWithAddedOne = [...workoutIdsList, id];

      setWorkoutIdsList(workoutWithAddedOne);
    }

    console.log(workoutIdsList);
  }

  async function handleWorkoutName(e: FormEvent) {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://exercisedb.p.rapidapi.com/exercises',
      headers: {
        'X-RapidAPI-Key': 'b2077e120emsh760fc651c650520p17d18ejsnac574cf674ca',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    axios
      .request(options)
      .then(response => setAllWorkouts(response.data))
      .catch(error => console.log(error));

    let auxiliarArray: any = [];

    for (let i = 0; i < allWorkouts.length; i++) {
      for (let j = 0; j < workoutIdsList.length; j++) {
        if (allWorkouts[i].id === workoutIdsList[j]) {
          auxiliarArray.push(allWorkouts[i]);
        }
      }
    }

    // PROBLEM IS HERE

    setWorkoutList(prev => [
      ...prev,
      {
        workoutName,
        list: auxiliarArray
      }
    ]);

    console.log(workoutList);

    setWorkoutIdsList([]);
    setWorkoutName('');
  }

  return (
    <div className="h-screen mb-12 relative">
      <div className="sm:px-16 px-6 py-8 relative w-full flex justify-center items-center 2xl:max-w-[1280px] mx-auto">
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

            <Dialog.Content className="absolute p-10 bg-black border border-secondary-blue rounded-2xl w-full max-w-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
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
                    required
                  />
                  <button
                    type="submit"
                    className="text-primary-white border border-secondary-blue p-1 border-l-0 mt-2 rounded-tr-lg rounded-br-lg hover:text-secondary-blue"
                  >
                    <HiSearch size={24} />
                  </button>
                </form>

                {showScroll && (
                  <ScrollArea.Root className="w-full h-[400px] rounded-[4px] overflow-hidden mt-4">
                    <ScrollArea.Viewport className="w-full h-full">
                      <div style={{ padding: '15px 20px' }}>
                        <div className="text-primary-white font-medium text-2xl mb-4">
                          Exercises
                        </div>

                        {listOfExecises.map(exercise => (
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

                            <Checkbox.Root
                              className="flex items-center gap-3 group focus:outline-none"
                              checked={workoutIdsList.includes(
                                exercise.id as string
                              )}
                              onCheckedChange={() =>
                                handleToggleWorkoutListIds(
                                  exercise.id as string
                                )
                              }
                            >
                              <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-black border-2 border-zinc-800 group-data-[state=checked]:bg-secondary-blue group-data-[state=checked]:border-secondary-blue transition-colors group-focus:ring-2 group-focus:ring-secondary-blue group-focus:ring-offset-2 group-focus:ring-offset-background">
                                <Checkbox.Indicator>
                                  <HiCheck size={20} className="text-white" />
                                </Checkbox.Indicator>
                              </div>
                            </Checkbox.Root>
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
                )}

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

      <div className="mb-[50px] h-[2px] bg-primary-white opacity-10" />

      <div className="gradient-04 z-0" />

      <TitleText title={<>My Workouts</>} textStyles="text-center" />

      <div className="sm:px-16 px-6 py-8 relative w-full flex justify-center items-center gap-20 flex-wrap 2xl:max-w-[1280px] mx-auto">
        {workoutList &&
          workoutList.slice(1).map(workout => (
            <div
              key={workout.workoutName}
              className="glassmorphism px-8 py-6 rounded-xl brightness-90"
            >
              <h1 className="text-white text-2xl mb-4 font-medium uppercase text-center">
                {workout.workoutName}
              </h1>
              {workout.list.map(exercise => (
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
                      <p className="text-gray-300">Target: {exercise.target}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Workout;
