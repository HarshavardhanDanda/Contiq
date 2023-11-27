import { Stack, styled } from "@mui/material";
import TypographyComponent from "../../atoms/Typography";
import { IconComponent } from "../../atoms/Icon";
import UpArrow from "../../../../public/assets/images/UpArrow.svg";
import UpArrowGray from "../../../../public/assets/images/lightUpArrow.svg";
import DownArrowGray from "../../../../public/assets/images/downArrowGray.svg";
import DownArrow from "../../../../public/assets/images/downArrow.svg";
import MinimizeIcon from "../../../../public/assets/images/minimize.svg";
import MaximizeIcon from "../../../../public/assets/images/maximize.svg";
import CopyIcon from "../../../../public/assets/images/copy.svg";
import SettingsIcon from "../../../../public/assets/images/3dots.svg";
import theme from "../../../theme/theme";
import SnackBar from "../../molecules/SnackBar";
import completeIcon from "../../../../public/assets/images/complete.svg";
import closeIcon from "../../../../public/assets/images/close.svg";
import { useSearchPanelHooks } from "./hooks";
import { v4 as uuidv4 } from "uuid";

export interface SearchPanelProps {
  searchQuery: string;
  docName: string;
  searchResults: [number, string][];
  totalPages: number;
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  handleNavigateSearch: (index: number) => void;
}

const WholeContainer = styled(Stack)({
  flexDirection: "column",
  gap: theme.spacing(4),
  alignItems: "flex-end",
  marginRight: theme.spacing(5),
});

const MainContainer = styled(Stack)({
  width: theme.spacing(96.5),
  minHeight: theme.spacing(10),
  backgroundColor: theme.palette.structural.background3,
  flexDirection: "column",
  border: `0.5px solid ${theme.palette.grey[100]}`,
  borderRadius: 4,
});

const TopStack = styled(Stack)({
  flexDirection: "row",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "5px 12px",
  borderBottom: `0.5px solid ${theme.palette.grey[100]}`,
});

const QueryStack = styled(Stack)({
  flexDirection: "row",
  padding: "0px 0px 0px 8px",
  justifyContent: "space-between",
  width: "100%",
  minHeight: theme.spacing(7.5),
  marginRight: theme.spacing(4),
  alignItems: "center",
});

const StyledIconComponent = styled(IconComponent)({
  cursor: "pointer",
  width: theme.spacing(6),
  height: theme.spacing(6),
});

const BottomContainer = styled(Stack)({
  padding: theme.spacing(5,6),
  gap: theme.spacing(3),
});

const SearchPanel = (props: SearchPanelProps) => {
  const {
    searchQuery,
    docName,
    searchResults,
    totalPages,
    currentPage,
    handleNavigateSearch,
  } = props;

  const {
    navigateSearchNext,
    navigateSearchBack,
    handleMinimize,
    isCopied,
    setIsCopied,
    minimize,
    searchIndex,
  } = useSearchPanelHooks(searchResults, handleNavigateSearch);

  const formatText = (text: string, searchKey: string) => {
    if (text === undefined) return;
    const trimmedText =
      text.length > 200 ? text.substring(0, 200) + "..." : text;
    const parts = trimmedText.split(new RegExp(`(${searchKey})`, "gi"));

    return (
      <div style={{ display: "inline" }}>
        {parts.map((part) => {
          const compareText = part.toLowerCase() === searchKey.toLowerCase();
          return (
            <TypographyComponent
              key={uuidv4()}
              color={
                compareText
                  ? theme.palette.textColor.black
                  : theme.palette.textColor.lowEmphasis
              }
              variant={compareText ? "caption1" : "h6"}
              style={{ display: "inline" }}
            >
              {part}
            </TypographyComponent>
          );
        })}
      </div>
    );
  };

  const formattedText = searchResults.length
    ? formatText(searchResults[searchIndex][1], searchQuery)
    : "";

  return (
    <WholeContainer>
      <MainContainer>
        <TopStack>
          <QueryStack>
            <TypographyComponent variant="body2">
              {searchQuery}
            </TypographyComponent>
            <Stack
              borderRight={`1px solid ${theme.palette.grey[100]}`}
              paddingRight={theme.spacing(2)}
              direction={"row"}
            >
              <TypographyComponent
                variant="body2"
                color={theme.palette.textColor.black}
              >
                {(searchIndex + 1).toString()}
              </TypographyComponent>
              <TypographyComponent
                variant="body2"
                color={theme.palette.textColor.lowEmphasis}
              >{`/${searchResults.length}`}</TypographyComponent>
            </Stack>
          </QueryStack>
          <Stack
            alignItems={"center"}
            direction={"row"}
            width={theme.spacing(26)}
            gap={theme.spacing(4)}
          >
            <StyledIconComponent
              src={searchIndex > 0 ? UpArrow : UpArrowGray}
              alt="up"
              onClick={navigateSearchBack}
            />
            <StyledIconComponent
              src={
                searchIndex < searchResults.length - 1
                  ? DownArrow
                  : DownArrowGray
              }
              alt="down"
              onClick={navigateSearchNext}
            />
            <StyledIconComponent
              src={minimize ? MaximizeIcon : MinimizeIcon}
              alt={minimize ? "maximize" : "minimize"}
              onClick={handleMinimize}
            />
          </Stack>
        </TopStack>
        {!minimize && (
          <BottomContainer>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
            >
              <Stack direction={"column"} width={"100%"}>
                <TypographyComponent variant="body1">
                  {docName}
                </TypographyComponent>
                <Stack direction={"row"}>
                  <TypographyComponent
                    variant="overline"
                    color={theme.palette.textColor.mediumEmphasis}
                  >
                    SLIDE&nbsp;&nbsp;
                  </TypographyComponent>
                  <TypographyComponent
                    variant="overline"
                    color={theme.palette.textColor.black}
                  >
                    {currentPage.toString()}
                  </TypographyComponent>
                  <TypographyComponent
                    variant="overline"
                    color={theme.palette.textColor.mediumEmphasis}
                  >{`/${totalPages}`}</TypographyComponent>
                </Stack>
              </Stack>
              <Stack
                direction={"row"}
                gap={theme.spacing(2)}
                width={theme.spacing(14)}
              >
                <StyledIconComponent
                  src={CopyIcon}
                  alt="copy"
                  onClick={() => {
                    setIsCopied(true);
                    navigator.clipboard.writeText(
                      searchResults.length ? searchResults?.[searchIndex][1] : "text"
                    );
                  }}
                />
                <StyledIconComponent src={SettingsIcon} alt="settings" />
              </Stack>
            </Stack>
            {formattedText}
          </BottomContainer>
        )}
      </MainContainer>
      {isCopied && (
        <SnackBar
          text={{
            children: "Text copied",
            variant: "body1",
            style: {
              color: theme.palette.textColor.white,
            },
          }}
          startIconSrc={completeIcon}
          endIconSrc={closeIcon}
          onClose={() => {
            setIsCopied(false);
          }}
        />
      )}
    </WholeContainer>
  );
};

export default SearchPanel;
