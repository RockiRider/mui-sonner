import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button, Stack } from "@mui/material";
import { toast } from "mui-sonner";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Material UI - Next.js example in TypeScript
        </Typography>
      </Box>
      <Stack alignItems="center" gap={5}>
        <Button variant="contained" onClick={() => toast("Second Node")}>
          Toast
        </Button>
      </Stack>
    </Container>
  );
}
