import ace from "ace-builds/src-noconflict/ace";
import type { Config, QueryProps } from "./types";
import axios, { type AxiosRequestConfig } from "axios";

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
