import ace from "ace-builds/src-noconflict/ace";
import type { Config, QueryProps, Query } from "./types";
import axios, { type AxiosRequestConfig } from "axios";

const baseUrl = "http://localhost:3001";

export const configAce = () => {
  ace.config.set(
    "basePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/"
  );
  ace.config.set(
    "modePath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/"
  );
  ace.config.set(
    "workerPath",
    "https://cdn.jsdelivr.net/npm/ace-builds@1.32.6/src-noconflict/"
  );
};

export const postQuery = async (
  args: QueryProps,
  config: AxiosRequestConfig<Config> | undefined
) => {
  let parsedQuery;
  if (args.query) {
    parsedQuery = JSON.parse(args.query);
  }
  switch (args.method) {
    case "GET": {
      const res = await axios.get(args.url, config);
      return res.data;
    }
    case "POST": {
      const res = await axios.post(args.url, parsedQuery);
      return res.data;
    }
    case "PUT": {
      const res = await axios.put(args.url, parsedQuery);
      return res.data;
    }
    case "DELETE": {
      const res = await axios.delete(args.url);
      return res.data;
    }
    default:
      throw new Error("Method not found.");
  }
};

interface UserInfoProps {
  user: {
    username: string;
    password: string;
  };
}

interface QuerySaveProps {
  username: string;
  id: string;
  url: string;
  method: string;
  query?: object;
}

export const registerAccount = async ({ user }: UserInfoProps) => {
  const res = await axios.post(`${baseUrl}/api/user/register/`, user);
  console.log(res.data);
  return res.data;
};

export const loginAccount = async ({ user }: UserInfoProps) => {
  const res = await axios.post(`${baseUrl}/api/user/login/`, user);
  return res.data;
};

export const saveQueryDb = async (queryToSave: QuerySaveProps) => {
  const res = await axios.post(`${baseUrl}/api/query/`, queryToSave);
  return res.data;
};

export const getSavedQueries = async (username: string): Promise<Query[]> => {
  const res = await axios.get(`${baseUrl}/api/query/${username}/queries`);
  return res.data;
};
