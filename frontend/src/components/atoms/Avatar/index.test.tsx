import { render, screen } from "@testing-library/react";
import Avatar from ".";
import "@testing-library/jest-dom";

describe("AvatarComponent", () => {
  it("renders with provided src and alt", () => {
    render(<Avatar src="path_to_test_avatar.jpg" alt="Test Avatar" />);
    const avatarElement = screen.getByAltText("Test Avatar");
    expect(avatarElement).toBeInTheDocument();
  });

  it("renders with custom size", () => {
    render(
      <Avatar
        src="path_to_test_avatar.jpg"
        alt="Large Test Avatar"
        sx={{ width: 80, height: 80 }}
      />
    );
    const avatarElement = screen.getByRole("img");
    expect(avatarElement).toBeInTheDocument();
  });
});
