import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Container, Box, type SelectChangeEvent } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { AxiosError, type AxiosRequestConfig } from "axios";
import {
  configAce,
  deleteQueryFromDb,
  getSavedQueries,
  postQuery,
  saveQueryDb,
} from "../utils";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import type { Config, JsonError, Query, QueryProps } from "../types";

import ResponseDisplay from "./ResponseDisplay";

import QueryList from "./QueryList";
import SavedQueryList from "./SavedQueryList";
import UserLoginLogout from "./UserLoginLogout";
import QueryOptionBox from "./QueryOptionBox";

const Home = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<object | undefined | AxiosError>(
    undefined
  );
  const [queries, setQueries] = useState<Query[]>([]);
  const [savedQueries, setSavedQueries] = useState<Query[]>([]);
  const [method, setMethod] = useState<string>("GET");
  const [config, setConfig] = useState<AxiosRequestConfig<Config>>();
  const [authorization, setAuthorization] = useState<string>("");
  const [token, setToken] = useState<string | null>("");

  const onUrlChange = (value: string) => {
    setUrl(value);
  };

  const onQueryChange = (value: string) => {
    SetQuery(value);
  };

  const loadQueries = async () => {
    const username: string | null = localStorage.getItem("username");
    if (username) {
      const res = await getSavedQueries(username);
      return res;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const username: string | null = localStorage.getItem("username");
      const token: string | null = localStorage.getItem("token");
      configAce();

      if (token && username) {
        setToken(localStorage.getItem("token"));
        try {
          const loadedQueries = await loadQueries();
          if (loadedQueries) {
            setSavedQueries(loadedQueries);
          }
        } catch (error) {
          console.log("Error loading queries:", error);
        }
      }
    };

    loadData();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const val = (_annotations: JsonError[]) => {
    //console.log(annotations);
  };

  const saveQuery = async () => {
    const username: string | null = localStorage.getItem("username");
    if (!username) {
      console.log("Login");
      return;
    }
    const queryToSave: Query = {
      id: uuidv4(),
      method,
      query: query ? JSON.parse(query) : undefined,
      url,
    };
    try {
      await saveQueryDb({
        username,
        ...queryToSave,
      });
      setSavedQueries(savedQueries.concat(queryToSave));
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (id: string) => {
    const t = localStorage.getItem("token");
    console.log(t);
    if (t) {
      const con: AxiosRequestConfig<Config> = {
        headers: {
          authorization: `Bearer ${t}`,
        },
      };
      try {
        await deleteQueryFromDb(id, con);
        setSavedQueries(savedQueries.filter((query) => query.id !== id));
      } catch (e: unknown) {
        if (e instanceof AxiosError) {
          console.log(e.response?.data);
        }
      }
    }
  };

  const selectQuery = (query: Query) => {
    setMethod(query.method);
    setUrl(query.url);
    if (query.query) {
      SetQuery(JSON.stringify(query.query, null, 2));
    } else {
      SetQuery("");
    }
    console.log(query);
  };

  const includesQuery = (arg: Query): boolean => {
    return queries.some((q) => {
      return (
        q.method === arg.method &&
        q.url === arg.url &&
        JSON.stringify(q.query) === JSON.stringify(arg.query)
      );
    });
  };

  const queryHandler = async () => {
    try {
      const queryToPost: QueryProps = {
        method,
        query: query,
        url,
      };
      if (authorization && token) {
        setConfig({
          headers: {
            authorization: `${authorization} ${token}`,
          },
        });
      }
      const res = await postQuery(queryToPost, config);
      setResponse(res);
      const userQuery: Query = {
        id: uuidv4(),
        method,
        query:
          method === "GET" || method === "DELETE"
            ? undefined
            : JSON.parse(query),
        url,
      };

      if (!includesQuery(userQuery)) {
        setQueries(queries.concat(userQuery));
      }
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setResponse(e);
      }
    }
  };

  const handleMethod = (e: SelectChangeEvent) => {
    setMethod(e.target.value);
  };

  const handleAuth = (e: SelectChangeEvent) => {
    setAuthorization(e.target.value);
  };

  const handleToken = (token: string) => {
    setToken(token);
  };

  const handleLogOut = () => {
    setToken(null);
    setSavedQueries([]);
    setQueries([]);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const handleError = () => {
    setUseErrors(!useErrors);
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <UserLoginLogout token={token} handleLogOut={handleLogOut} />
      <p>https://jsonplaceholder.typicode.com/posts</p>
      <QueryOptionBox
        onUrlChange={onUrlChange}
        handleAuth={handleAuth}
        handleToken={handleToken}
        handleMethod={handleMethod}
        queryHandler={queryHandler}
        saveQuery={saveQuery}
        handleError={handleError}
        authorization={authorization}
        method={method}
        error={useErrors}
        url={url}
      />
      <Box sx={{ width: "100%", margin: "auto" }}>
        <Box sx={{ display: "flex" }}>
          <QueryList queries={queries} handleClick={selectQuery} />
          <AceEditor
            mode="json"
            theme="xcode"
            onChange={onQueryChange}
            name="placeholder"
            value={query}
            onValidate={val}
            width="100%"
            height="300px"
            setOptions={{
              useWorker: useErrors,
              fontSize: "16px",
            }}
            style={{
              margin: "0.5rem auto 0.5rem auto",
              backgroundColor: "#eee",
            }}
          ></AceEditor>
          <SavedQueryList
            queries={savedQueries}
            handleClick={selectQuery}
            handleDelete={handleDelete}
          />
        </Box>
        <ResponseDisplay res={response} />
      </Box>
    </Container>
  );
};

export default Home;
