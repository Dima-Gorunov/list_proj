import MuiButton, { ButtonProps } from "@mui/material/Button";

// Создайте интерфейс для пропсов вашего расширенного компонента Button

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  let customStyles = {
    color: "white",
    backgroundColor: "primary",
    ":hover": { backgroundColor: "primary" },
    ...props.sx,
  };

  // if (props.customColor) {
  //   switch (props.customColor) {
  //     case "gray":
  //       customStyles = {
  //         backgroundColor: "gray",
  //         ":hover": { backgroundColor: "gray" },
  //       };
  //       break;
  //     case "red":
  //       customStyles = {
  //         backgroundColor: "red",
  //         ":hover": { backgroundColor: "red" },
  //       };
  //       break;
  //     default:
  //       break;
  //   }
  // }

  return (
    <MuiButton
      variant={props.variant || "contained"}
      sx={customStyles}
      {...props}
    >
      {children}
    </MuiButton>
  );
};
