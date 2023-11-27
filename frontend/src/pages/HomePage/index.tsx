import NoFileInfo from "../../components/molecules/NoFileInfo";
import NavBar from "../../components/organisms/NavBar";
import HomeTemplate from "../../components/templates/HomeTemplate";
import noFileImage from "../../../public/assets/images/empty state.svg";
import theme from "../../theme/theme";
import { Box, Stack, styled } from "@mui/material";
import TypographyComponent from "../../components/atoms/Typography";
import FileCard from "../../components/molecules/FileCard";
import { SCROLLBAR_STYLE_2, fileImaesArray } from "../../constants";
import pdfIcon from "../../../public/assets/images/icon-pdf.svg";
import { PDFFileType } from "../FilesPage";
import { useEffect, useState } from "react";
import { getAllFilesByUserId } from "../../services/FileService";
import { useNavigate } from "react-router";
import { getUserData } from "../../utils/functions";

const ContentHeader = styled(Box)({
  display: "flex",
  maxWidth: theme.spacing(321),
  padding: `${theme.spacing(7)} ${theme.spacing(6)}`,
  alignItems: "center",
  gap: theme.spacing(210.75),
  background: theme.palette.textColor.white,
});

const ContentContainer = styled(Box)({
  overflowY: "auto",
});

const Nofiles = (
  <NoFileInfo
    iconSrc={noFileImage}
    iconAlt={"no-file-image"}
    title={{
      variant: "subtitle1",
      children: "No files available",
      color: theme.palette.textColor.black,
    }}
    subtitle={{
      variant: "body2",
      children: "Start by syncing your cloud storage to contiq",
      color: theme.palette.textColor.lowEmphasis,
    }}
    style={{ textAlign: "center", justifyContent: "center" }}
  ></NoFileInfo>
);

const HomePage = () => {
  const [files, setFiles] = useState<PDFFileType[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = getUserData()
        const fifteenDaysAgo = new Date();
        fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

        const response = await getAllFilesByUserId(userId);
        // Filter files created within the last 15 days
        const filteredFiles = response.filter((file: any) => {
          const fileCreatedAt = new Date(file.createdAt);
          return fileCreatedAt >= fifteenDaysAgo;
        });
        setFiles(filteredFiles);
      } catch (error) {
        console.error("An error occurred while fetching files:", error);
      }
    };
    fetchData();
  }, []);


  function getHomePageFileContent(files: any[]) {
    const handleDoubleClick = (id: number) => {
      navigate(`/pdf/${id}`);
    };
    const renderFileCards = () => {
      return files.map((file: PDFFileType, index) => (
        <FileCard
          key={file.id}
          image={{
            src: fileImaesArray[index % 3],
            alt: file.name,
          }}
          textIcon={{
            src: pdfIcon,
            alt: "PDF Icon",
          }}
          text={{
            variant: "body1",
            children: file.name,
          }}
          fileType={file.type}
          created_at={file.createdAt}
          updated_at={file.updatedAt}
          onDoubleClick={() => handleDoubleClick(file.id)}
        />
      ));
    };

    return (
      <>
        <ContentHeader>
          <TypographyComponent
            variant="h2"
            style={{ color: theme.palette.textColor.black }}
          >
            {"Home"}
          </TypographyComponent>
        </ContentHeader>
        <TypographyComponent
          variant="h3"
          style={{
            margin: theme.spacing(6),
            color: theme.palette.textColor.lowEmphasis,
          }}
        >
          {"Recent"}
        </TypographyComponent>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          marginLeft={theme.spacing(6)}
          marginRight={theme.spacing(6)}
          gap={theme.spacing(6)}
          sx={{
            maxHeight: "550px",
            overflowY: "auto",
            ...SCROLLBAR_STYLE_2
          }}
        >
          {renderFileCards()}
        </Stack>
      </>
    );
  }

  const renderContent = () => {
    if (files.length === 0) {
      return (
        <>
          <ContentHeader>
            <TypographyComponent
              variant="h2"
              style={{ color: theme.palette.textColor.black }}
            >
              {"Home"}
            </TypographyComponent>
          </ContentHeader>
          <Stack
            width={"100%"}
            height={"620px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {Nofiles}
          </Stack>
        </>
      );
    } else {
      return (
        <ContentContainer>
          <>{getHomePageFileContent(files)}</>
        </ContentContainer>
      );
    }
  };

  return (
    <HomeTemplate
      sidebar={<NavBar data-testid="nav-bar" activeItem="Home"></NavBar>}
      content={renderContent()}
    ></HomeTemplate>
  );
};

export default HomePage;
