import StarBorderIcon from "@mui/icons-material/StarBorder";
import MuiStarIcon from "@mui/icons-material/Star";
type StarIconProps = {
  active: boolean;
};

export const StarIcon: React.FC<StarIconProps> = ({ active }) => {
  return active ? (
    <MuiStarIcon color="primary" />
  ) : (
    <StarBorderIcon color="secondary" />
  );
};
