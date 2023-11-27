import { useEffect, useState } from "react";
import {
  convertDateFormat,
  formatCurrentDateToString,
  getEndDateFormat,
  getStartDateFormat,
} from "../../utils/functions";
import { SelectChangeEvent } from "@mui/material";
import { getAllFiles } from "../../services/FileService";
import { PDFFileType } from ".";

export const useFilesData = () => {
  const [startDateLabel, setStartDateLabel] = useState<string>("Start date");
  const [endDateLabel, setEndDateLabel] = useState<string>("End date");
  const [fileType, setFileType] = useState<string>("");
  const [publishedType, setPublishedType] = useState<string>("");

  const [filteredFiles, setFilteredFiles] = useState<PDFFileType[]>([]);

  const selectedStartDate = getStartDateFormat(startDateLabel);
  const selectedEndDate = getEndDateFormat(endDateLabel);

  const filterFiles = (file: any, userId: number) => {
    const fileDate = convertDateFormat(file.createdAt);
    const isDateInRange =
      fileDate >= selectedStartDate && fileDate <= selectedEndDate;
    const isPublishedByMe = publishedType === "Published by me";
    const isPublishedByOthers = publishedType === "Published by others";
    const isValidDate =
      selectedStartDate !== "0000-00-00 00:00:00" ||
      selectedEndDate !== formatCurrentDateToString();
    
    if(fileType !== "PDF" && (fileType as string) !== "") {
      return false
    }

    if ((fileType as string) === "") {
      return true;
    }

    if (isPublishedByMe) {
      return file.uploadedBy === userId && isDateInRange;
    } else if (isPublishedByOthers) {
      return file.uploadedBy !== userId && isDateInRange;
    } else if (isValidDate) {
      return isDateInRange;
    } else {
      return true;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllFiles();
        const userId = (JSON.parse(localStorage.getItem("userDetails") as string) || {})?.id;
        const filtered = response.filter((file: any) => filterFiles(file, userId));
        setFilteredFiles(filtered);
      } catch (error) {
        console.error("An error occurred while fetching files:", error);
      }
    };

    fetchData();
  }, [selectedStartDate, selectedEndDate, publishedType, fileType]);


  const handleFileChange = (event: SelectChangeEvent<string>) => {
    setFileType(event.target.value);
  };

  const handlePublishedChange = (event: SelectChangeEvent<string>) => {
    setPublishedType(event.target.value);
  };

  return {
    startDateLabel,
    setStartDateLabel,
    endDateLabel,
    setEndDateLabel,
    fileType,
    setFileType,
    publishedType,
    setPublishedType,
    selectedStartDate,
    selectedEndDate,
    filteredFiles,
    handleFileChange,
    handlePublishedChange,
  };
};
