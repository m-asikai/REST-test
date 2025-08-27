import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Container, Box, type SelectChangeEvent } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { AxiosError, type AxiosRequestConfig, type AxiosResponse } from "axios";
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
import Error from "./Error";

const Home = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<
    AxiosError | AxiosResponse | undefined
  >(undefined);
  const [queries, setQueries] = useState<Query[]>([]);
  const [savedQueries, setSavedQueries] = useState<Query[]>([]);
  const [method, setMethod] = useState<string>("GET");
  const [config, setConfig] = useState<AxiosRequestConfig<Config>>();
  const [authorization, setAuthorization] = useState<string>("");
  const [token, setToken] = useState<string | null>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingMessage, setLoadingMessage] = useState<string>("");

  useEffect(() => {
    if (authorization === "") {
      setToken("");
    }
  }, [authorization]);
  useEffect(() => {
    const loadData = async () => {
      const username: string | null = localStorage.getItem("username");
      const token: string | null = localStorage.getItem("token");
      configAce();

      if (token && username) {
        try {
          setLoadingMessage("Loading queries...");
          const loadedQueries = await loadQueries();
          if (loadedQueries) {
            setSavedQueries(loadedQueries);
            if (loadedQueries.length === 0) {
              setLoadingMessage("No saved queries.");
            }
          }
        } catch (error) {
          console.error("Error loading queries:", error);
        }
      } else {
        setLoadingMessage("Login to save queries.");
      }
    };

    loadData();
  }, []);

  const onUrlChange = (value: string) => {
    setUrl(value);
  };

  const onQueryChange = (value: string) => {
    SetQuery(value);
  };

  const loadQueries = async () => {
    const token: string | null = localStorage.getItem("token");
    if (token) {
      const res = await getSavedQueries();
      return res;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const val = (_annotations: JsonError[]) => {
    //console.log(annotations);
  };

  const saveQuery = async () => {
    const username: string | null = localStorage.getItem("username");
    if (!username) {
      setErrorMessage("Login to save queries.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    if (!url) {
      setErrorMessage("Couldn't save query. Please enter an URL.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
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
    if (!url) {
      setErrorMessage("URL is required.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
      return;
    }
    try {
      const queryToPost: QueryProps = {
        method,
        query: query,
        url,
      };

      if (authorization && token) {
        const encoder = new TextEncoder();
        const data = encoder.encode(token);
        const base64 = btoa(String.fromCharCode(...data));
        setConfig({
          headers: {
            authorization:
              authorization === "Bearer "
                ? `${authorization}${token}`
                : `${authorization}${base64}`,
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
      console.log(e);
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
    setSavedQueries([]);
    setQueries([]);
    setLoadingMessage("Login to save queries.");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  const handleError = () => {
    setUseErrors(!useErrors);
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginBottom: 2,
        }}
      >
        <Box sx={{ flex: 1 }} />
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <Error message={errorMessage} />
        </Box>
        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <UserLoginLogout handleLogOut={handleLogOut} />
        </Box>
      </Box>

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
        token={token}
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
              margin: "1rem auto 0.5rem auto",
              backgroundColor: "#eee",
            }}
          ></AceEditor>
          <SavedQueryList
            queries={savedQueries}
            handleClick={selectQuery}
            handleDelete={handleDelete}
            loadingMessage={loadingMessage}
          />
        </Box>
        <ResponseDisplay res={response} />
      </Box>
    </Container>
  );
};

export default Home;
