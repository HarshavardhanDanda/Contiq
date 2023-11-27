export interface IconProps {
  src: string;
  alt: string;
  height?: string;
  width?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export const IconComponent = ({ ...props }: IconProps) => {
  return <img {...props} />;
};
