import { About, Contact, Explore, GetStarted, Hero } from '../components';

const Home = () => {
  return (
    <>
      <Hero />

      <div className="relative">
        <About />

        <div className="gradient-03 z-0" />

        <Explore />
      </div>

      <div className="relative">
        <GetStarted />

        <div className="gradient-04 z-0" />

        <Contact />
      </div>
    </>
  );
};

export default Home;
