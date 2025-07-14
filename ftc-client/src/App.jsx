import Routes from "./router/routes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <Toaster 
        richColors
        position="bottom-right" 
        swipeDirections={["left", "right"]} 
        expand={true}
        duration={5000}
      />
      <Routes />
    </>
  );
};

export default App;
