import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2600 }} />
      <AppRoutes />
    </>
  );

}

export default App;
