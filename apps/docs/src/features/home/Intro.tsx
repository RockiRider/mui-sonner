import { Card, Stack, Typography } from "@mui/material";

const Intro = () => {
  return (
    <Stack alignItems="center">
      <Stack
        component={Card}
        sx={{
          my: 20,
          maxWidth: 800,
          p: 3,
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={3}
      >
        <Typography variant="h4" component="h1">
          MUI-Sonner
        </Typography>
        <Typography variant="h5" component="h2">
          An opinionated toast library for Material UI and React
        </Typography>
        <Typography variant="body1" component="p">
          Based on the original sonner
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Intro;
