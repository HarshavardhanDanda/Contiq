import React from "react";
import { IconComponent } from "../../atoms/Icon/index";
import TypographyComponent, {
  TypographyComponentProps,
} from "../../atoms/Typography/index";

export interface NoFileInfoProps {
  iconSrc: string;
  iconAlt: string;
  title: TypographyComponentProps;
  subtitle: TypographyComponentProps;
  style?: React.CSSProperties;
}

const NoFileInfo: React.FC<NoFileInfoProps> = ({
  iconSrc,
  iconAlt,
  title,
  subtitle,
  style,
}) => {
  return (
    <div style={{ ...style }}>
      <IconComponent src={iconSrc} alt={iconAlt} />
      <TypographyComponent {...title} />
      <TypographyComponent {...subtitle} />
    </div>
  );
};

export default NoFileInfo;
