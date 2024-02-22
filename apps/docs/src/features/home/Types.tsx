import CustomToaster from "@components/CustomToaster";
import FuncDisplay, { FuncData } from "@components/FuncDisplay";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "mui-sonner";

const TYPES_DEMO: FuncData[] = [
  {
    component: (
      <Button variant="contained" onClick={() => toast("Hello world!")}>
        Default
      </Button>
    ),
    codeString: `toast("Hello world!")`,
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => toast.success("Something went well!")}
      >
        Success
      </Button>
    ),
    codeString: `toast.success("Something went well!")`,
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => toast.error("Something went wrong!")}
      >
        Error
      </Button>
    ),
    codeString: `toast.error("Something went wrong!")`,
  },
  {
    component: (
      <Button variant="contained" onClick={() => toast.warning("Warning!")}>
        Warning
      </Button>
    ),
    codeString: `toast.warning("Warning!")`,
  },
  {
    component: (
      <Button variant="contained" onClick={() => toast.info("Info!")}>
        Info
      </Button>
    ),
    codeString: `toast.info("Info!")`,
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() =>
          toast("Custom type", {
            action: {
              label: "Undo",
              onClick: () => {
                alert("Undoing action");
              },
            },
          })
        }
      >
        Action
      </Button>
    ),
    codeString: `toast("Custom type", {
  action: {
    label: "Undo",
    onClick: () => {
      alert("Undoing action");
    }
  },
})`,
  },
];

const Types = () => {
  return (
    <Stack gap={2} sx={{ mb: 10 }}>
      <Typography variant="h6">Types</Typography>
      <Typography>
        You can customise the type of toast you want to render, and pass in
        additional options as an object in the second argument.
      </Typography>
      <FuncDisplay data={TYPES_DEMO} />
    </Stack>
  );
};

export default Types;
