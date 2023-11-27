import { Meta, StoryFn } from "@storybook/react";
import ModalMolecule, { ModalMoleculeProps } from ".";
import TypographyComponent from "../../atoms/Typography";
import theme from "../../../theme/theme";
import { action } from "@storybook/addon-actions";

export default {
  title: "molecules/Modal",
  component: ModalMolecule,
  parameters: {
    layout: "centered",
  },
} as Meta;

const Template: StoryFn<ModalMoleculeProps> = (args: ModalMoleculeProps) => (
  <ModalMolecule {...args} />
);

export const ModalWithTitle = Template.bind({});
ModalWithTitle.args = {
  open: true,
  onClose: () => {
    action("Modal closed")();
  },
  handleNavigateBack: () => {
    action("Called Go Back")();
  },
  title: "My Modal",
  content: (
    <TypographyComponent variant="h1" color={theme.palette.textColor.white}>
      This is Modal Content
    </TypographyComponent>
  ),
};

export const ModalWithoutTitle = Template.bind({});
ModalWithoutTitle.args = {
  open: true,
  onClose: () => {
    action("Modal closed")();
  },
  content: (
    <TypographyComponent
      variant="h3"
      color={theme.palette.textColor.white}
    >This is Modal Content</TypographyComponent>
  ),
};
