import axios from "axios";
import {
  DEPLOYED_API_GATEWAY_URL,
  DRIVE_API_KEY,
  DRIVE_SCOPE,
  DRIVE_DISCOVERY_DOCS,
  DRIVE_CLIENT_ID,
} from "../../constants";
import { gapi } from "gapi-cjs";

export interface UploadFile {
  name: string;
  type: string;
  file: File | Blob;
  created_at: string;
  updated_at: string;
  uploaded_by: number;
}

export const getFileById = async (fileId: number) => {
  try {
    const response = await fetch(DEPLOYED_API_GATEWAY_URL + `/files/${fileId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const contentDisposition = response.headers.get("Content-Disposition");
    const filename = contentDisposition
      ? contentDisposition
          .split("filename=")[1]
          .split(";")[0]
          .replace(/"/g, "")
      : "response.pdf";

    const buffer = await response.arrayBuffer();
    const unit8Array = new Uint8Array(buffer);

    return { name: filename, file: unit8Array };
  } catch (error) {
    throw new Error("File with the given ID does not exist!!");
  }
};

export const getAllFiles = async () => {
  try {

    const response = await axios.get(DEPLOYED_API_GATEWAY_URL + `/files`);
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong!!!");
  }
};

export const getAllFilesByUserId = async (userId: number) => {
  try {
    const response = await axios.get(
      DEPLOYED_API_GATEWAY_URL + `/files/user?userId=${userId}`
    );
    return response.data;
  } catch (error: any) {
    throw new Error("Something went wrong!!!");
  }
};

export const saveFile = async (file: UploadFile) => {
  try {
    const formData = new FormData();
    formData.append("file", file.file);
    formData.append("name", file.name);
    formData.append("type", file.type);
    formData.append("uploaded_by", file.uploaded_by.toString());

    const response = await axios.post(
      DEPLOYED_API_GATEWAY_URL + "/files/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Something went wrong!!!");
  }
};

export const downloadDriveFile = async (fileId: string) => {
  try {
    const initClient = () => {
      gapi.client
        .init({
          apiKey: DRIVE_API_KEY,
          clientId: DRIVE_CLIENT_ID,
          discoveryDocs: [DRIVE_DISCOVERY_DOCS],
          scope: DRIVE_SCOPE,
        })
        .then(() => {
          const isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();

          if (!isSignedIn) {
            gapi.auth2.getAuthInstance().signIn();
          }
          console.log("initiated gapi");
        });
    };
    gapi.load("client:auth2", initClient);

    const blob = gapi.client.drive.files
      .get({
        fileId: fileId,
        alt: "media",
      })
      .then((response: any) => {
        if (typeof response.body === "string") {
          const charArray = new Array(response.body.length);
          for (let i = 0; i < response.body.length; i++) {
            charArray[i] = response.body.charCodeAt(i);
          }
          const typedArray = new Uint8Array(charArray);

          const blob = new Blob([typedArray], {
            type: response.headers["Content-Type"],
          });
          return blob;
        } else {
          console.warn("Unexpected response type. Expected a string.");
          return undefined;
        }
      })
      .catch((error: any) => {
        console.error("Error downloading file:", error);
      });
    return blob;
  } catch (error) {
    console.error("Error fetching file from Google Drive:", error);
    return undefined;
  }
};

export const getAllSearchResults = async (key: string) => {
  try {
    const response = await axios.get(

      DEPLOYED_API_GATEWAY_URL + `/files/search?key=${key}`
    );
    if (response.status === 204) {
      return [];
    }
    return response.data;
  } catch (error: any) {
    throw new Error("Something went wrong!!!");
  }
};