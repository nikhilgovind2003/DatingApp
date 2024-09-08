import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { SocketProvider } from "./context/SocketContext.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ChakraProvider>
      {/* <React.StrictMode> */}
      <SocketProvider>
        <App />
      </SocketProvider>
      {/* </React.StrictMode> */}
    </ChakraProvider>
  </Provider>
);
