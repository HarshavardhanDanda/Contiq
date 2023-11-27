import React from "react";
import { Modal, Stack, styled } from "@mui/material";
import { IconComponent } from "../../atoms/Icon";
import LeftArrow from "../../../../public/assets/images/leftArrow.svg";
import CloseModal from "../../../../public/assets/images/closeFile.svg";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";

export interface ModalMoleculeProps {
  open: boolean;
  onClose: () => void;
  handleNavigateBack?: () => void;
  title?: string;
  content: React.ReactNode;
  isConfirmModal?: boolean;
}

const StyledModal = styled(Modal)({
  backgroundColor: theme.palette.grey[400],
  display: "flex",
  flexDirection: "column",
  margin:'auto'
});

const Header = styled(Stack)(({ title }) => ({
  width: "100%",
  height: `${theme.spacing(20)}`,
  flexDirection: "row",
  justifyContent: title ? "space-between" : "flex-end",
  alignItems: "center",
  borderBottom: title ? `1px solid ${theme.palette.grey[300]}` : "none",
  backgroundColor: theme.palette.grey[400],
}));

const ModalMolecule: React.FC<ModalMoleculeProps> = ({
  open,
  onClose,
  title,
  content,
  handleNavigateBack,
  isConfirmModal = false,
}) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      sx={
        isConfirmModal
          ? { maxWidth: theme.spacing(121), height: theme.spacing(61.5) }
          : { maxWidth: theme.spacing(174), height: theme.spacing(149.5) }
      }
    >
      <>
        {!isConfirmModal && (
          <Header title={title}>
            {!!(title?.length) && (
              <Stack
                direction={"row"}
                gap={theme.spacing(3)}
                width={"fit-content"}
                alignItems={"center"}
                marginLeft={theme.spacing(6)}
              >
                <IconComponent
                  src={LeftArrow}
                  alt="back"
                  width={theme.spacing(6)}
                  height={theme.spacing(6)}
                  style={{ cursor: "pointer" }}
                  onClick={handleNavigateBack}
                />
                <TypographyComponent
                  variant="h3"
                  color={theme.palette.textColor.white}
                >
                  {title}
                </TypographyComponent>
              </Stack>
            )}
            <IconComponent
              data-testid="closeIcon"
              src={CloseModal}
              alt="close"
              width={theme.spacing(6)}
              height={theme.spacing(6)}
              style={{ marginRight: theme.spacing(6), cursor: "pointer" }}
              onClick={onClose}
            />
          </Header>
        )}
        <Stack
          width={"100%"}
          height={theme.spacing(129)}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{backgroundColor: theme.palette.grey[400]}}
        >
          {content}
        </Stack>
      </>
    </StyledModal>
  );
};

export default ModalMolecule;
