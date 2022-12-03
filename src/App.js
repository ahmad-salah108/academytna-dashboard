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
import Units from "./pages/Units";
import Lessons from "./pages/Lessons";
import Subjects from "./pages/Subjects";
import Exams from './pages/Exams'
import Questions from './pages/Questions'

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    errorElement: <h1 sx={{textAlign: 'center'}}>Page not found 404</h1>,
    children: [
      {
        index: true,
        element: <Courses/>,
      },
      {
        path: 'courses',
        element: <Courses/>,
      },
      {
        path: 'courses/:CourseId/unit/:unitId/exams',
        element: <Exams/>,
      },
      {
        path: 'courses/:CourseId',
        element: <Units/>,
      },
      {
        path: 'courses/:CourseId/:UnitId',
        element: <Lessons/>,
      },
      {
        path: 'courses/:CourseId/unit/:unitId/exams/:examId/questions',
        element: <Questions/>,
      },
      {
        path: 'subjects',
        element: <Subjects/>,
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
