import { Box, Stack, styled } from "@mui/material"
import theme from "../../../theme/theme"

export const StyledStack=styled(Stack)({
    flexDirection:"row",
    minHeight:"50px",
    width:"100%",
    gap:"12px",
    justifyContent:"space-between",
    flexWrap:"wrap"
})

export const StyledRelevantStack=styled(Stack)({
    width:"164px",
    height:"36px",
    border:`1px solid ${theme.palette.grey[100]}`,
    borderRadius:"4px",
    flexDirection:"row",
    alignItems:"center",
    gap:"5px",
    padding:"3px 4px",
})

export const StyledIconStack=styled(Stack)({
    width:"94px",
    height:"36px",
    border:`1px solid ${theme.palette.grey[100]}`,
    borderRadius:"4px",
    flexDirection:"row",
    gap:"4px",
    alignItems:"center"
})
export const StyledBox=styled(Box)({
    width:"44px",
    height:"34px",
    backgroundColor:`${theme.palette.primary.primary100}`,
    alignItems:"center",
    padding:"5px 9px"
})
