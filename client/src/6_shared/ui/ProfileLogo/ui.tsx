import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";

type ProfileLogoProps = {
  handleClick: (event: any) => void;
};

export const ProfileLogo: React.FC<ProfileLogoProps> = ({ handleClick }) => {
  return (
    <IconButton
      onClick={handleClick}
      size="small"
      sx={{ ml: 2 }}
      aria-controls={open ? "account-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
    >
      <AccountCircle fontSize="large" sx={{ color: "white" }} />
    </IconButton>
  );
};
