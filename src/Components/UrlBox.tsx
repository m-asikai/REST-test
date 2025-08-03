import type { UrlBoxProps } from "../types";

const UrlBox = ({ onChange }: UrlBoxProps) => {
  return (
    <input
      type="text"
      placeholder="Enter URL"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default UrlBox;
