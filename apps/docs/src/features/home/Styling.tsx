import FuncDisplay, { FuncData } from "@components/FuncDisplay";
import Link from "@components/Link";
import { Button, Stack, Typography } from "@mui/material";

const STYLING_DEMO: FuncData[] = [
  {
    component: <Button variant="contained">For All Toasts</Button>,
    codeString: `<Toaster alertSx={{p:2}}/>`,
  },
  {
    component: <Button variant="contained">For Individual Toasts</Button>,
    codeString: `toast("Custom type", {
        action: {
          label: "Undo",
          onClick: () => {
            alert("Undoing action");
          },
          buttonSx: {p: 5},
        },
      })`,
  },
];
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
