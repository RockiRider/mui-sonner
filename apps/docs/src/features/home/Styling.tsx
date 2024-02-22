import FuncDisplay, { FuncData } from "@components/FuncDisplay";
import Link from "@components/Link";
import { Stack, Typography } from "@mui/material";

const STYLING_DEMO: FuncData[] = [];
const Styling = () => {
  return (
    <Stack gap={2} width={1} sx={{ mb: 10 }}>
      <Typography variant="h6">Styling</Typography>
      <Typography>
        By default the toast is styled to match your MUI theme's{" "}
        <Link href="https://mui.com/material-ui/react-alert/">Alert</Link> and{" "}
        <Link href="https://mui.com/material-ui/api/alert-title/">
          AlertTitle
        </Link>{" "}
        components.
      </Typography>
      <Typography>
        If you want to override your default theme styles, you can do this in
        multiple ways
      </Typography>
      <FuncDisplay data={STYLING_DEMO} />
    </Stack>
  );
};

export default Styling;
