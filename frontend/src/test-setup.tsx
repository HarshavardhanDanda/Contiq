import {
  render as testingLibraryRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (
  ui: React.ReactElement,
  options?: RenderOptions
): RenderResult => testingLibraryRender(ui, { wrapper, ...options });

export * from "@testing-library/react";

export { customRender as render };
