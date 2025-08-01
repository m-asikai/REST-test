export interface JsonError {
  row: number;
  column: number;
  text: string;
  type: string;
}

export interface ResponseProps {
  res?: object;
}

export interface UrlBoxProps {
  onChange: (value: string) => void;
}
