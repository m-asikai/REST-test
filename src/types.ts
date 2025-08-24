import type { SelectChangeEvent } from "@mui/material";
import type { AxiosError, AxiosResponse } from "axios";

export interface UserInfoProps {
  user: {
    username: string;
    password: string;
  };
}

export interface QuerySaveProps {
  username: string;
  id: string;
  url: string;
  method: string;
  query?: object;
}

export interface JsonError {
  row: number;
  column: number;
  text: string;
  type: string;
}

export interface ResponseProps {
  res: AxiosResponse | AxiosError | undefined;
}

export interface UrlBoxProps {
  onChange: (value: string) => void;
  url: string;
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
  loadingMessage: string;
}

export interface Query {
  id: string;
  method: string;
  url: string;
  query?: object;
}

export interface Config {
  header: {
    authorization: string;
  };
}

export interface QueryProps {
  method: string;
  url: string;
  query?: string;
}

export interface AuthSelectorProps {
  handleChange: (e: SelectChangeEvent) => void;
  handleToken: (token: string) => void;
  authorization: string;
  token: string | null;
}
