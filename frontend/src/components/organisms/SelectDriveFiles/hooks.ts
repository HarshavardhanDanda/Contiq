import { useState } from "react";
import { Files } from "../UploadFiles/hooks";
import { getCurrentDateTime } from "../../../utils/functions";
import { downloadDriveFile, saveFile } from "../../../services/FileService";

export const useSelectDriveFiles = (onClose: () => void) => {
  const [selectedFiles, setSelectedFiles] = useState<Files[]>([]);

  const getUserData = () => {
    const userDetailsJSON = localStorage.getItem("userDetails");
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      return userDetails.id;
    } else {
      console.log("User details not found in localStorage");
    }
  };

  const handleSync = async () => {
  try {
    await Promise.all(selectedFiles.map(async (file: any) => {
      const fileBlob: Blob = await downloadDriveFile(file.id);
      if (fileBlob) {
        const fileData = {
          name: file.name,
          type: file.fileExtension,
          file: fileBlob,
          created_at: getCurrentDateTime(),
          updated_at: getCurrentDateTime(),
          uploaded_by: getUserData(),
        };
        await saveFile(fileData);
      }
    }));

    onClose();
  } catch (error) {
    console.error("An error occurred while syncing files:", error);
  }
};

  const handleFileSelect = (file: Files, prevSelectedFiles: Files[]) => {
    const fileIndex = prevSelectedFiles.findIndex(
      (selectedFile) => selectedFile.name === file.name
    );
    if (fileIndex === -1) {
      return [...prevSelectedFiles, file];
    } else {
      return prevSelectedFiles.filter((_, index) => index !== fileIndex);
    }
  };

  return {
    setSelectedFiles,
    handleFileSelect,
    handleSync,
  };
};
