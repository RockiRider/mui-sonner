import { Button } from "@mui/material";
import { toast } from "mui-sonner";

const Basic = () => {
  return (
    <>
      <Button data-testid="basic_btn" onClick={() => toast("Hello World")}>
        Basic
      </Button>
      <Button
        data-testid="success_btn"
        onClick={() => toast.success("My Success Toast")}
      >
        Success
      </Button>
      <Button
        data-testid="error_btn"
        onClick={() => toast.error("My Error Toast")}
      >
        Error
      </Button>
      <Button
        data-testid="warning_btn"
        onClick={() => toast.warning("My Warning Toast")}
      >
        Warning
      </Button>
      <Button
        data-testid="info_btn"
        onClick={() => toast.info("My Info Toast")}
      >
        Info
      </Button>
      <Button
        data-testid="loading_btn"
        onClick={() => toast.loading("My Loading Toast")}
      >
        Loading
      </Button>
      <Button
        data-testid="promise_success_btn"
        onClick={() => {
          const prom = new Promise((resolve) => {
            setTimeout(() => {
              resolve("Success");
            }, 200);
          });

          toast.promise(prom, {
            loading: "Loading Success",
            success: "Promise Success",
          });
        }}
      >
        Promise Success
      </Button>
      <Button
        data-testid="promise_error_btn"
        onClick={() => {
          const prom = new Promise((_resolve, reject) => {
            setTimeout(() => {
              reject("Error");
            }, 200);
          });

          toast.promise(prom, {
            loading: "Loading Error",
            error: "Promise Error",
          });
        }}
      >
        Promise Error
      </Button>
      <Button
        data-testid="non_dismissible_btn"
        onClick={() =>
          toast("Non-dismissible", {
            dismissible: false,
          })
        }
      >
        Non-dismissible
      </Button>
      <Button
        data-testid="infinite_btn"
        onClick={() =>
          toast("Infinite", {
            duration: Infinity,
          })
        }
      >
        Infinite
      </Button>
    </>
  );
};

export default Basic;
