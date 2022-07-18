import React, { InputHTMLAttributes } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<IProps> = ({ ...props }) => <input {...props} />;
export default Input;
