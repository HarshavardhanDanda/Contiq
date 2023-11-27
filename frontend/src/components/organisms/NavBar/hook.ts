import homeIconActive from "../../../../public/assets/images/home-active.svg";
import filesIconActive from "../../../../public/assets/images/file-active.svg";
import { IconProps } from "../../atoms/Icon";
import { useNavigate } from "react-router";

export const useNavBarHooks = (activeItem: string) => {
  const navigate = useNavigate();
  const handleItemClick = (icon: IconProps) => {
    if (icon.alt === "home-icon") {
      navigate("/home");
      return "Home";
    } else if (icon.alt === "files-icon-inactive") {
      navigate("/files");
      return "Files";
    }
    return undefined;
  };

  const handleIcon = (icon: IconProps) => {
    if (icon.alt === "home-icon") {
      if (activeItem === "Home") {
        return { src: homeIconActive, alt: "home-icon-active" };
      } else {
        return icon;
      }
    } else if (icon.alt === "files-icon-inactive") {
      if (activeItem === "Files") {
        return { src: filesIconActive, alt: "files-icon-active" };
      } else {
        return icon;
      }
    } else {
      return icon;
    }
  };

  return {
    handleIcon,
    handleItemClick,
    activeItem
  };
};
