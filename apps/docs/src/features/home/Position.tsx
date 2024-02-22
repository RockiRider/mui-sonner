import FuncDisplay, { FuncData } from "@components/FuncDisplay";
import { Button, Stack, Typography } from "@mui/material";
import { toast } from "mui-sonner";

const POSITION_DEMO: FuncData[] = [
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "top-left",
          });
        }}
      >
        Top left
      </Button>
    ),
    codeString: "<Toaster position='top-left' />",
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "top-center",
          });
        }}
      >
        Top center
      </Button>
    ),
    codeString: "<Toaster position='top-center' />",
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "top-right",
          });
        }}
      >
        Top right
      </Button>
    ),
    codeString: "<Toaster position='top-right' />",
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "bottom-left",
          });
        }}
      >
        Bottom left
      </Button>
    ),
    codeString: "<Toaster position='bottom-left' />",
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "bottom-center",
          });
        }}
      >
        Bottom center
      </Button>
    ),
    codeString: "<Toaster position='bottom-center' />",
  },
  {
    component: (
      <Button
        variant="contained"
        onClick={() => {
          toast.dismiss();
          toast("Toasting this toast", {
            position: "bottom-right",
          });
        }}
      >
        Bottom right
      </Button>
    ),
    codeString: "<Toaster position='bottom-right' />",
  },
];

const Position = () => {
  return (
    <Stack gap={2} width={1} sx={{ mb: 10 }}>
      <Typography variant="h6">Position</Typography>
      <Typography>
        Swipe direction changes depending on the position.
      </Typography>
      <FuncDisplay data={POSITION_DEMO} />
    </Stack>
  );
};

export default Position;
