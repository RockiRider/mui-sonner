import { Icon, CircularProgress } from "@mui/material";
import { Toaster, ToasterProps } from "mui-sonner";
import CloseIcon from "@mui/icons-material/Close";

type CustomToasterProps = Omit<ToasterProps, "closeIcon" | "loadingIcon">;
const CustomToaster = (props: CustomToasterProps) => {
  return (
    <Toaster
      {...props}
      closeIcon={
        <Icon sx={{ width: 24, height: 24 }}>
          <CloseIcon />
        </Icon>
      }
      loadingIcon={<CircularProgress size={20} />}
    />
  );
};

export default CustomToaster;
