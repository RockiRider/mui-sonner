import Code from "@components/Code";
import { Stack, Typography } from "@mui/material";

const Install = () => {
  return (
    <Stack gap={1} width={0.5}>
      <Typography>Installation</Typography>
      <Code code="npm install mui-sonner" />
    </Stack>
  );
};

export default Install;
