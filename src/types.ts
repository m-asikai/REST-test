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

export interface QueryListProps {
  queries: Query[];
  handleClick: (query: Query) => void;
}

export interface Query {
  method: string;
  url: string;
  query?: object;
}
