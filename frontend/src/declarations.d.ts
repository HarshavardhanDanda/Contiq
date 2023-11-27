declare module '*.png'
declare module '*.svg'
declare module '*.pdf' {
    const content: string;
    export default content;
}

declare module "@pdftron/pdfjs-express-viewer";
declare module "uuid";