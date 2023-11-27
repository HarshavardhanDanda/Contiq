import ResetPassword from ".";

export default {
  title: "organisms/ResetPassword",
  component: ResetPassword,
};

const Template = () => <ResetPassword handleResetClick={function (): void {
  throw new Error("Function not implemented.");
} } />;

export const Reset_Password = Template.bind({});

