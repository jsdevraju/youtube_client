import { StaticImageData } from "next/image";
import React, { ImgHTMLAttributes } from "react";

interface IProps extends ImgHTMLAttributes<HTMLImageElement | StaticImageData> {}

const Image: React.FC<IProps> = ({ ...props }) => <img {...props} />;
export default Image;
