import AppContextProvider from "./contexts/AppContextProvider";
import { Toaster } from "sonner";
import Routes from "./router/Routes";

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
