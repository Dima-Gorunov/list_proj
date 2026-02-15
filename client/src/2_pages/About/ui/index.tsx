import { Box } from "@mui/material";
import { Button } from "../../../6_shared";
import { Link, useNavigate } from "react-router-dom";
export const AboutPage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("navigate");
  };
  return Array.from({ length: 10 }).map((item, index) => (
    <Button key={index} onClick={handleClick}>
      qwdqwd
    </Button>
  ));
};
