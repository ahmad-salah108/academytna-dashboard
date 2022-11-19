import { Button, ButtonBase, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Main from "./Main";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import Courses from "./pages/Courses";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <h1>Page not found 404</h1>,
    children: [
      {
        path: 'courses',
        element: <Courses/>,
      },
      {
        path: '*',
        element: <h1>Page not found 404</h1>,
      }
    ]
  },
]);

function App() {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
