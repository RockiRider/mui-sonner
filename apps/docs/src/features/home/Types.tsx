import FuncDisplay, { FuncData } from "@components/FuncDisplay";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "mui-sonner";

const TYPES_DEMO: FuncData[] = [
  {
    component: (
      <Button
        variant="contained"
        onClick={() => toast("You have a new message!")}
      >
        Default
      </Button>
    ),
    codeString: `toast("You have a new message!")`,
  },
];

const Types = () => {
  return (
    <Stack gap={2}>
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
