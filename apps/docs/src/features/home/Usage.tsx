import Code from "@components/Code";
import { Stack, Typography } from "@mui/material";

const Usage = () => {
  return (
    <Stack gap={1} width={0.5}>
      <Typography variant="h6">Usage</Typography>
      <Stack gap={2}>
        <Typography>
          Add Toaster to your app - make sure its placed at the top!
        </Typography>
        <Code code="<div><Toaster/></div" />
      </Stack>
      <Stack gap={2}>
        <Typography>Start toasting - call it from anywhere!</Typography>
        <Code code={`toast("Hello World")`} />
      </Stack>
    </Stack>
  );
};

export default Usage;
