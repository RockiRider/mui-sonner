import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { toast } from "mui-sonner";
import { Button, Stack } from "@mui/material";

function App() {
  return (
    <>
      <Stack>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </Stack>
      <h1>Vite + React</h1>
      <div className="card">
        <Button
          onClick={() =>
            toast.success("Save Successful", {
              description: "Your item has been saved.",
              closeButton: true,
            })
          }
        >
          count is
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
