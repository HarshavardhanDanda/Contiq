import { useRef, useState } from "react";
import {gapi} from "gapi-cjs";
import { DRIVE_API_KEY, DRIVE_CLIENT_ID, DRIVE_DISCOVERY_DOCS, DRIVE_SCOPE } from "../../../constants";
import { saveFile } from "../../../services/FileService";
import { getCurrentDateTime } from "../../../utils/functions";

export interface Folder {
  id: string;
  name: string;
  files: Files[];
}

export interface Files {
  id: string;
  name: string;
  parents: string;
}
export interface Response<T> {
  result: T;
  body: string;
  headers?: { [headerName: string]: string };
  status?: number;
  statusText?: string;
}

export interface DriveFile {
  mimeType: string;
}

export interface DriveListResponse {
  files: DriveFile[];
}

export const useFileUpload = (onClose: () => void) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [uploadConfirmOpen, setUploadConfirmOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("Upload Files");

  const [allDriveFiles, setAllDriveFiles] = useState<any[]>([]);
  const [isDriveLoading, setIsDriveLoading] = useState(false);
  const [isDriveFolderSelectModal, setIsDriveFolderSelectModal] = useState(false);

  const getUserData = () => {
    const userDetailsJSON = localStorage.getItem("userDetails");
    if (userDetailsJSON) {
      const userDetails = JSON.parse(userDetailsJSON);
      return userDetails.id;
    } else {
      console.log("User details not found in localStorage");
    }
  };

  const getModalTitle = () => {
    if (progressModalOpen || uploadConfirmOpen) {
        setModalTitle("");
    } else if (uploadModalOpen) {
        setModalTitle("Upload Files");
    }
  };

  const openProgressModal = () => {
    setProgressModalOpen(true);
    getModalTitle();
  };

  const closeProgressModal = () => {
    setProgressModalOpen(false);
    getModalTitle();
  };

  const openUploadConfirmModal = () => {
    setUploadConfirmOpen(true);
    getModalTitle();
  };

  const closeUploadConfirmModal = () => {
    setUploadConfirmOpen(false);
    getModalTitle();
  };
 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const validFiles: File[] = [];

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.type === "application/pdf") {
          validFiles.push(file);
        } else {
          alert("Please select valid PDF files.");
          return;
        }
      }
    }

    setSelectedFiles(validFiles);
    getModalTitle();
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openUploadModal = () => {
    setUploadModalOpen(true);
    getModalTitle();
  };

  const closeUploadModal = () => {
    setUploadModalOpen(false);
    setSelectedFiles([]);
    getModalTitle();
  };

  const handleUpload = async () => {
    try {
      setUploadConfirmOpen(false)
      const fileData = {
        name: selectedFiles[0].name,
        type: selectedFiles[0].type.slice(-3),
        file: selectedFiles[0],
        created_at: getCurrentDateTime(),
        updated_at: getCurrentDateTime(),
        uploaded_by: getUserData(),
      };
      const response = await saveFile(fileData);
      console.log("successfully uploaded file!", response.name);
      openProgressModal();
      closeUploadConfirmModal();
      getModalTitle();
      onClose();
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  };


  const handleClientLoad = () => {
    setIsDriveLoading(true);
    gapi.load("client:auth2", initClient);
  };

  const initClient = () => {
    gapi.client
      .init({
        apiKey: DRIVE_API_KEY,
        clientId: DRIVE_CLIENT_ID,
        discoveryDocs: [ DRIVE_DISCOVERY_DOCS ],
        scope: DRIVE_SCOPE,
      })
      .then(() => {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      });
  };
  const updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      listFiles();
    } else {
      handleAuthClick();
    }
  };

   const listFiles = () => {
     gapi.client.drive.files
       .list({
         fields: "files",
       })
       .then((response: Response<DriveListResponse>) => {
         const res = JSON.parse(response.body);
         const folderData = res.files.filter(
           (file: { mimeType: string }) =>
             file?.mimeType.split(".").pop()?.toLowerCase() === "folder"
         );

         const files = res.files.filter(
           (file: any) =>
             file?.mimeType.split(".").pop()?.toLowerCase().includes("pdf")
         );
         setAllDriveFiles(organizeData(folderData, files));
         setIsDriveLoading(false);
         setIsDriveFolderSelectModal(true);
         setModalTitle("Add files");
       })
       .catch((error: Response<DriveListResponse>) => console.log(error));
   };

   const handleAuthClick = () => {
     gapi.auth2.getAuthInstance().signIn();
   };

   const organizeData = (folders: Folder[], files: Files[]): Folder[] => {
     const folderMap: Record<string, Folder> = {};

     folders.forEach((folder) => {
       folderMap[folder.id] = {
         id: folder.id,
         name: folder.name,
         files: [],
       };
     });

     files.forEach((file) => {
       const parentFolderId = file.parents;
       if (folderMap[parentFolderId]) {
         folderMap[parentFolderId].files.push(file);
       }
     });

     return Object.values(folderMap);
   };

  return {
    selectedFiles,
    setSelectedFiles,
    fileInputRef,
    uploadModalOpen,
    setUploadModalOpen,
    handleFileChange,
    triggerFileInput,
    openUploadModal,
    closeUploadModal,
    progressModalOpen,
    openProgressModal,
    closeProgressModal,
    handleUpload,
    uploadConfirmOpen,
    openUploadConfirmModal,
    closeUploadConfirmModal,
    modalTitle,
    isDriveLoading,
    allDriveFiles,
    handleClientLoad,
    setModalTitle,
    isDriveFolderSelectModal,
    setIsDriveFolderSelectModal,
  };
};