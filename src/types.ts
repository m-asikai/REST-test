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

export interface QueryHistoryProps {
  queries: object[];
  handleClick: (query: string) => void;
}
