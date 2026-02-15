import MuiTextField, { TextFieldProps } from "@mui/material/TextField";

interface CustomTextFieldProps {
  customColor?: "red" | "gray";
}

type ExtendedTextFieldProps = TextFieldProps & CustomTextFieldProps;
export const TextField: React.FC<ExtendedTextFieldProps> = ({ ...props }) => {
  return <MuiTextField color="primary" {...props} />;
};
