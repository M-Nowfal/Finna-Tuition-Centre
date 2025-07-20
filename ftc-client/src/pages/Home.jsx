import Achievements from "../sections/welcome/Achievements";
import Hero from "../sections/welcome/Hero";
import About from "../sections/welcome/About";
import Reviews from "../sections/welcome/Reviews";
import { useOutletContext } from "react-router-dom";

const Home = () => {

  const { setHome } = useOutletContext();

  return (
    <>
      <Hero setHome={setHome} />
      <About />
      <Achievements />
      <Reviews setHome={setHome} />
    </>
  );
};

export default Home;
