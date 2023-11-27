import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SignInPage } from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import { FilesPage } from "./pages/FilesPage";
import PDFViewerPage from "./pages/PDFViewerPage";
import PrivateRoutes from "./routes/privateRoutes";
import PublicRoutes from "./routes/publicRoutes";

function App(): React.ReactElement {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/resetpassword" element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/pdf/:fileId" element={<PDFViewerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
