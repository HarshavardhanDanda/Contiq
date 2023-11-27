import { useState } from "react";

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useFileSelection = (initialFiles: { filename: string }[]) => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const handleFileSelect = (filename: string, isSelected: boolean) => {
    if (isSelected) {
      setSelectedFiles((prevFiles) => [...prevFiles, filename]);
    } else {
      setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== filename));
    }
  };

  const handleSyncClick = () => {
    console.log("Syncing the following files:", selectedFiles);
  };

  const handleBackClick = () => {
    console.log("Back Screen");
  };

  return {
    selectedFiles,
    handleFileSelect,
    handleSyncClick,
    handleBackClick,
  };
};