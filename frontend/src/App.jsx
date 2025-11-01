import { createBrowserRouter, RouterProvider } from "react-router-dom";
import publicRoutes from "./routes/publicRoute";
import requiredAuthRoute from "./routes/requiredAuthRoute";
import adminRoute from "./routes/adminRoute";

const App = () => {
  const routes = createBrowserRouter([
    ...publicRoutes,
    ...requiredAuthRoute,
    ...adminRoute,
  ]);

  return <RouterProvider router={routes} />;
};
export default App;
