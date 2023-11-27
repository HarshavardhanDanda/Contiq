import { useState } from "react";
import { Folder } from "../UploadFiles/hooks";

export const useChooseDriveFolder = (
  // eslint-disable-next-line no-unused-vars
  setTitle: (title: string) => void,
  // eslint-disable-next-line no-unused-vars
  setIsDriveFolderSelectModal: (folderModal: boolean) => void
) => {
  const [folderData, setFolderData] = useState<Folder>({
    id: "",
    name: "",
    files: [],
  });
  const handleNavigateBack = () => {
    setFolderData({
      id: "",
      name: "",
      files: [],
    });
    setTitle("Add files");
  };
  const navigateBackToTabs = () => {
    setIsDriveFolderSelectModal(false);
    setTitle("Upload files");
  };

  return {
    folderData,
    setFolderData,
    navigateBackToTabs,
    handleNavigateBack,
  };
};
