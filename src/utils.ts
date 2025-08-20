import ace from "ace-builds/src-noconflict/ace";
import type {
  Config,
  QueryProps,
  Query,
  UserInfoProps,
  QuerySaveProps,
} from "./types";
import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

const baseUrl = "https://rest-backend-dm19.onrender.com";

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
): Promise<AxiosResponse | AxiosError> => {
  let parsedQuery;
  if (args.query) {
    parsedQuery = JSON.parse(args.query);
  }
  switch (args.method) {
    case "GET": {
      const res = await axios.get(args.url, config);
      return res;
    }
    case "POST": {
      const res = await axios.post(args.url, parsedQuery, config);
      return res;
    }
    case "PUT": {
      const res = await axios.put(args.url, parsedQuery, config);
      return res;
    }
    case "DELETE": {
      const res = await axios.delete(args.url, config);
      return res;
    }
    default:
      throw new Error("Method not found.");
  }
};

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

export const getSavedQueries = async (): Promise<Query[]> => {
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const res = await axios.get(`${baseUrl}/api/query/user-queries`, config);
  return res.data;
};

export const deleteQueryFromDb = async (
  id: string,
  config: AxiosRequestConfig<Config> | undefined
) => {
  console.log(id);
  const res = await axios.delete(`${baseUrl}/api/query/${id}`, config);
  return res.data;
};
