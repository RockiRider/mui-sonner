import { Box, Stack } from "@mui/material";
import { useState } from "react";
import Code from "./Code";

export type FuncData = {
  component: JSX.Element;
  codeString: string;
};

interface FuncDisplayProps {
  data: FuncData[];
}

const FuncDisplay = ({ data }: FuncDisplayProps) => {
  const [selected, setSelected] = useState<number>(0);
  return (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        {data.map((item, index) => (
          <Box key={item.codeString} onClick={() => setSelected(index)}>
            {item.component}
          </Box>
        ))}
      </Stack>
      <Code code={data[selected]?.codeString as string} />
    </Stack>
  );
};

export default FuncDisplay;
