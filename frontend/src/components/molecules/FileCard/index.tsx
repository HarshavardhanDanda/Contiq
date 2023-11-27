import React from "react";
import { Card, styled, Stack } from "@mui/material";
import { IconComponent, IconProps } from "../../atoms/Icon";
import TypographyComponent, {
  TypographyComponentProps,
} from "../../atoms/Typography";
import theme from "../../../theme/theme";

export interface FileCardProps {
  image: IconProps;
  textIcon: IconProps;
  text: TypographyComponentProps;
  onDoubleClick: () => void;
  fileType?: string;
  created_at?: string;
  updated_at?: string;
}

const StyledCard = styled(Card)({
  width: "290px",
  height: "228px",
  gap: theme.spacing(3),
  alignItems: "flex-start",
  display: "inline-flex",
  flexDirection: "column",
  boxShadow: "none",
  padding: "none",
  borderRadius: theme.spacing(2),
  cursor: "pointer",
});

const FileCard: React.FC<FileCardProps> = ({
  image,
  textIcon,
  text,
  onDoubleClick,
}) => {
  return (
    <StyledCard onDoubleClick={onDoubleClick} data-testid="file-card">
      <Stack
        width={"290px"}
        height="192px"
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          backgroundColor: theme.palette.structural.background3,
          borderRadius: "8px",
        }}
      >
        <IconComponent
          src={image.src}
          alt={image.alt}
          style={{
            borderRadius: "5px",
            height: "160px",
            width: "258px",
          }}
        />
      </Stack>
      <Stack direction={"row"} gap={"12px"} alignItems={"center"}>
        <IconComponent
          src={textIcon.src}
          alt={textIcon.alt}
          style={{
            display: "flex",
            width: "24px",
            height: "24px",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <TypographyComponent color={theme.palette.textColor.black} {...text} />
      </Stack>
    </StyledCard>
  );
};

export default FileCard;
