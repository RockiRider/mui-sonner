import { Button } from "@mui/material";
import { toast } from "mui-sonner";
import { useState } from "react";

const Advanced = () => {
  const [showAutoClose, setShowAutoClose] = useState(false);
  const [showDismiss, setShowDismiss] = useState(false);

  return (
    <>
      <Button
        data-testid="auto_close_call_back_btn"
        onClick={() =>
          toast("Auto Close", {
            onAutoClose: () => setShowAutoClose(true),
          })
        }
      >
        On Auto Close
      </Button>
      {showAutoClose && <div data-testid="auto_close_el"></div>}
      <Button
        data-testid="dismiss_toast_btn"
        onClick={() =>
          toast("On Dismiss", { onDismiss: () => setShowDismiss(true) })
        }
      >
        On Dismiss
      </Button>
      {showDismiss && <div data-testid="dismiss_el"></div>}
    </>
  );
};

export default Advanced;
