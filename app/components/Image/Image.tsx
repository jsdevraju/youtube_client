import React, { ImgHTMLAttributes } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement> {}

const Image: React.FC<IProps> = ({ ...props }) => <img {...props} />;
export default Image;
