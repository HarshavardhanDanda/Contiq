import NavBar from "../../components/organisms/NavBar";
import PdfViewer from "../../components/organisms/PDFViewer";
import HomeTemplate from "../../components/templates/HomeTemplate";

const PDFViewerPage = () => {
  return (
    <HomeTemplate
      sidebar={<NavBar activeItem="Home" />}
      content={<PdfViewer />}
    />
  );
};

export default PDFViewerPage;
