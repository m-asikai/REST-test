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

export interface SavedQuery extends Query {
  handleDelete: (id: string) => void;
}

export interface SavedQueryListProps extends QueryListProps {
  handleDelete: (id: string) => void;
}

export interface Query {
  id: string;
  method: string;
  url: string;
  query?: object;
}

export interface Config {
  header: {
    Authorization: string;
  };
}

export interface QueryProps {
  method: string;
  url: string;
  query?: string;
}
