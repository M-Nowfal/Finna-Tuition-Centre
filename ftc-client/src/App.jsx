import AppContextProvider from "./contexts/AppContextProvider";
import Routes from "./router/routes";
import { Toaster } from "sonner";

const App = () => {
  return (
    <>
      <AppContextProvider>
        <Toaster
          richColors
          position="bottom-right"
          swipeDirections={["left", "right"]}
          expand={true}
          duration={5000}
        />
        <Routes />
      </AppContextProvider>
    </>
  );
};

export default App;
