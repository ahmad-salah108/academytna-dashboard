import { Button, ButtonBase, ThemeProvider } from "@mui/material";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Button variant="contained">asd</Button>
    </ThemeProvider>
  );
}

export default App;
