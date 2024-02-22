import { IconButton, Paper, Typography, useTheme } from "@mui/material";
import copy from "copy-to-clipboard";
import { useCallback, useState } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
};

interface CodeProps {
  code: string;
}

const Code = ({ code }: CodeProps) => {
  const theme = useTheme();

  const currentMode = theme.palette.mode;
  const desiredBgColor =
    currentMode === "dark"
      ? theme.palette.common.white
      : theme.palette.common.black;

  const desiredTextColor =
    currentMode === "dark"
      ? theme.palette.common.black
      : theme.palette.common.white;

  const [copying, setCopying] = useState(0);

  const onCopy = useCallback(() => {
    copy(code);
    setCopying((c) => c + 1);
    setTimeout(() => {
      setCopying((c) => c - 1);
    }, 2000);
  }, []);

  return (
    <Paper
      sx={{
        backgroundColor: desiredBgColor,
        p: 2,
        cursor: "pointer",
        position: "relative",
      }}
      onClick={onCopy}
    >
      <Typography component="pre" sx={{ color: desiredTextColor }}>
        {code}
      </Typography>
      <IconButton
        sx={{
          position: "absolute",
          right: 8,
          top: "50%",
          color: desiredTextColor,
          transform: "translateY(-50%)",
          cursor: "pointer",
          borderRadius: 5,
          width: 26,
          height: 26,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        aria-label="Copy code"
      >
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence initial={false} mode="wait">
            {copying ? (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="check"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="copy"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </IconButton>
    </Paper>
  );
};
export default Code;
