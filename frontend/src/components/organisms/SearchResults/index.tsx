import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import SearchResultIcon1 from "../../../../public/assets/images/searchresult-icon1.svg";
import SearchResultIcon2 from "../../../../public/assets/images/searchresult-icon2.svg";
import { SEARCH_RESULTS, OTHER_DOCS } from "../../../constants";

export interface SearchResultProps {
  fileData: { id: number; name: string }[];
  // eslint-disable-next-line no-unused-vars
  onSearchResultClick: (id: number) => void;
}

const MainContainer = styled(Stack)({
  flexDirection: "column",
  padding: theme.spacing(3),
  overflowY: "auto",
  width: theme.spacing(88),
  maxHeight: theme.spacing(70.5),
  borderRadius: theme.spacing(1),
  border: `1px solid ${theme.palette.grey[100]}`,
  boxShadow: `0px 21px 32px 0px #D5CEDD`,
  backgroundColor: theme.palette.textColor.white,

  "&::-webkit-scrollbar": {
    width: theme.spacing(3.5),
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.structural.background3,
    width: theme.spacing(3.5),
    borderRadius: theme.spacing(3),
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.spacing(4),
    border: `${theme.spacing(1)} solid ${theme.palette.structural.background3}`,
    height: theme.spacing(49),
    width: theme.spacing(1.5),
  },
});

const ResultsContainer = styled(Stack)({
  flexDirection: "column",
  gap: theme.spacing(4),
  marginBottom: theme.spacing(5),
  marginTop: theme.spacing(2),
  width: "100%",
});

const ImageContainer = styled(Stack)({
  flexDirection: "row",
  marginTop: theme.spacing(2),
  gap: theme.spacing(4),
  width: "100%",
});

const SearchResults = (props: SearchResultProps) => {
  const { fileData, onSearchResultClick } = props;
  return (
    <MainContainer>
      <TypographyComponent variant="caption1">
        {SEARCH_RESULTS}
      </TypographyComponent>
      <ResultsContainer>
        {fileData.map((file) => {
          return (
            <TypographyComponent
              key={file.name}
              variant="body2"
              color={theme.palette.textColor.lowEmphasis}
              onClick={() => onSearchResultClick(file.id)}
              style={{cursor: "pointer"}}
            >
              {file.name}
            </TypographyComponent>
          );
        })}
      </ResultsContainer>
      <TypographyComponent variant="caption1">{OTHER_DOCS}</TypographyComponent>
      <ImageContainer>
        <IconComponent
          src={SearchResultIcon1}
          width={"146px"}
          height={"80px"}
          alt="PDF"
        />
        <IconComponent
          src={SearchResultIcon2}
          width={"146px"}
          height={"80px"}
          alt="PDF"
        />
      </ImageContainer>
    </MainContainer>
  );
};

export default SearchResults;
