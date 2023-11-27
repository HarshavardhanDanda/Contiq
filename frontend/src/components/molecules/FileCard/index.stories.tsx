import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import FileCard, { FileCardProps } from ".";
import fileCardImg from "../../../../public/assets/images/filecard-img.svg";
import pdfIcon from "../../../../public/assets/images/icon-pdf.svg";
import theme from "../../../theme/theme";

export default {
  title: "molecules/FileCard",
  component: FileCard,
} as Meta;

const Template: StoryFn<FileCardProps> = (args) => <FileCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  image: {
    src: fileCardImg,
    alt: "Card Image",
    height: "160px",
    width: "258px",
    style: {
      borderRadius: "5px",
      background: theme.palette.structural.background3,
      padding: "16px",
    },
  },
  textIcon: {
    src: pdfIcon,
    alt: "Pdf Icon",
    style: {
      display: "flex",
      width: "24px",
      height: "24px",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  text: {
    variant: "body1",
    children: "Company agreement.pdf",
  }
};
