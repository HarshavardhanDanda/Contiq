import { Box, SelectChangeEvent, Stack } from "@mui/material";
import DropDown from "../../molecules/DropDown";
import {
  END_DATE,
  FILE_TYPE,
  FILE_TYPE_ITEMS,
  MOST_RELEVANT,
  PUBLISHED_SETTING,
  PUBLISHED_SETTING_ITEMS,
  START_DATE,
} from "../../../constants";
import Calendar from "../Calendar";
import theme from "../../../theme/theme";
import { IconComponent } from "../../atoms/Icon";
import TypographyComponent from "../../atoms/Typography";
import directionIcon from "../../../../public/assets/images/direction.svg";
import chevronDown from "../../../../public/assets/images/chevronGrayDown.svg";
import gridIcon from "../../../../public/assets/images/grid.svg";
import menuItemsIcon from "../../../../public/assets/images/menuItems.svg";
import {
  StyledBox,
  StyledIconStack,
  StyledRelevantStack,
  StyledStack,
} from "./index.styles";

export interface FilterBarProps {
  startDate: string;
  endDate: string;
  fileType: string;
  publishedType: string;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  handleFileTypeChange: (event: SelectChangeEvent<any>) => void;
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-explicit-any
  handlePublishedTypeChange: (event: SelectChangeEvent<any>) => void;
  handleFileTypeClear?: () => void;
  handlePublishedTypeClear?: () => void;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  selectedStartDate?: string;
  selectedEndDate?: string;
}
const FilterBar = ({
  startDate,
  endDate,
  fileType,
  publishedType,
  handleFileTypeChange,
  handleFileTypeClear,
  handlePublishedTypeChange,
  handlePublishedTypeClear,
  setStartDate,
  setEndDate,
  selectedStartDate,
  selectedEndDate,
}: FilterBarProps) => {
  return (
    <StyledStack>
      <Stack
        direction="row"
        gap="12px"
        marginLeft={"24px"}
        flexWrap={"wrap"}
      >
        <DropDown
          menuItems={FILE_TYPE_ITEMS}
          placeholder={FILE_TYPE}
          label={FILE_TYPE}
          handleChange={handleFileTypeChange}
          handleClear={handleFileTypeClear}
          value={fileType}
        />
        <Calendar
          label={START_DATE}
          date={startDate}
          setDatelabel={setStartDate}
          maxDate={selectedEndDate}
        />
        <Calendar
          label={END_DATE}
          date={endDate}
          setDatelabel={setEndDate}
          minDate={selectedStartDate}
        />
        <DropDown
          menuItems={PUBLISHED_SETTING_ITEMS}
          placeholder={PUBLISHED_SETTING}
          label={PUBLISHED_SETTING}
          handleChange={handlePublishedTypeChange}
          handleClear={handlePublishedTypeClear}
          value={publishedType}
        />
      </Stack>
      <Stack direction="row" gap={theme.spacing(3)} marginRight={"24px"} marginLeft={"24px"}>
        <StyledRelevantStack>
          <IconComponent
            src={directionIcon}
            alt={"direction-icon"}
            height="24px"
            width="24px"
          />
          <TypographyComponent
            variant="body1"
            color={theme.palette.textColor.black}
          >
            {MOST_RELEVANT}
          </TypographyComponent>
          <IconComponent
            src={chevronDown}
            alt={"chevron-down"}
            height="24px"
            width="24px"
          />
        </StyledRelevantStack>
        <StyledIconStack>
          <StyledBox>
            <IconComponent
              src={gridIcon}
              alt={"grid-icon"}
              height="24px"
              width="24px"
            />
          </StyledBox>
          <Box padding="11px 7px 7px 6px">
            <IconComponent
              src={menuItemsIcon}
              alt={"menuItems-icon"}
              height="24px"
              width="24px"
            />
          </Box>
        </StyledIconStack>
      </Stack>
    </StyledStack>
  );
};
export default FilterBar;
