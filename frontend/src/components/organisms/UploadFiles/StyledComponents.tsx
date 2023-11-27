import { Box, styled } from "@mui/material";
import Tabs from "../../molecules/Tabs";
import theme from "../../../theme/theme";
import TypographyComponent from "../../atoms/Typography";
import ButtonComponent from "../../atoms/Button";

export const StyledContainer = styled(Box)({
  display: "flex",
  width: "648px",
  height: "417px",
  padding: "32px 97px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "24px",
  gap: "40px",
  flexShrink: 0,
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23959596FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='6' stroke-linecap='square'/%3e%3c/svg%3e")`,
});
export const UploadCard = styled(Box)<{ hasSelectedFiles: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${(props) => (props.hasSelectedFiles ? "32px" : "12px")};
  width: 648px;
  height: 417px;
  padding: 32px 97px;
  border-radius: 4px;
  margin-top: 24px;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='4' ry='4' stroke='%23959596FF' stroke-width='2' stroke-dasharray='12%2c 12' stroke-dashoffset='6' stroke-linecap='square'/%3e%3c/svg%3e");
`;
export const StyledTabs = styled(Tabs)({
  display: "inline-flex",
  width: "696px",
  height: "34px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  paddingTop: "10px",
});
export const StyledUploadButton = styled(ButtonComponent)(({ theme }) => ({
  display: "flex",
  width: "96px",
  padding: "7px 8px",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  borderRadius: "4px",
  background: theme.palette.primary.primary500,
}));
export const StyledCancelButton = styled(ButtonComponent)(({ theme }) => ({
  "&.MuiButton-outlined": {
    borderColor: theme.palette.grey[100],
    color: theme.palette.textColor.white,
  },
  "&.MuiButton-outlined:hover": {
    backgroundColor: "transparent",
  },
  display: "flex",
  padding: "3px 4px",
  justifyContent: "center",
  alignItems: "center",
  gap: "4px",
  color: theme.palette.textColor.white,
  borderRadius: "4px",
  border: `1px solid ${theme.palette.grey[100]}`,
}));
export const StyledButton = styled(ButtonComponent)(({ theme }) => ({
  "&.MuiButton-outlined": {
    borderColor: theme?.palette?.textColor?.white,
    color: theme?.palette?.textColor?.white,
    border: `1px solid ${theme.palette.grey[100]}`,
    display: "flex",
    width: "166px",
    padding: "8px 24px",
    justifyContent: "center",
    alignItems: "center",
    gap: "2px",
    borderRadius: "4px",
    marginTop: "40px",
  },
  "&.MuiButton-outlined:hover": {
    backgroundColor: "transparent",
  },
  display: "flex",
  width: "166px",
  padding: "8px 24px",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  borderRadius: "4px",
}));
export const FileDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
});
export const Footer = styled(Box)({
  display: "flex",
  width: "484px",
  height: "52px",
  padding: "16px 24px 0px 281px",
  justifyContent: "flex-end",
  alignItems: "center",
  flexShrink: 0,
});
export const FileName = styled(TypographyComponent)({
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100px",
});
export const UploadModalContainer = styled(Box)({
  display: "flex",
  width: "484px",
  height: "246px",
  padding: "24px 0px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  flexShrink: 0,
  borderRadius: "4px",
  background: theme.palette.grey[400],
});
export const DialogHeader = styled(Box)({
  display: "flex",
  width: "484px",
  padding: "0px 24px 16px 24px",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
});
export const FooterActions = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "20px",
});
export const GridContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: "20px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: `${theme.palette.grey[400]} !important`
});
