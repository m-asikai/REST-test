import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Button, Container, Box, type SelectChangeEvent } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { type AxiosRequestConfig } from "axios";
import { configAce, getSavedQueries, postQuery, saveQueryDb } from "../utils";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";
import "ace-builds/src-noconflict/ext-language_tools";

import type { Config, JsonError, Query, QueryProps } from "../types";

import ResponseDisplay from "./ResponseDisplay";

import UrlBox from "./UrlBox";
import QueryList from "./QueryList";
import SavedQueryList from "./SavedQueryList";
import MethodSelector from "./MethodSelector";
import AuthSelector from "./AuthSelector";
import UserLoginLogout from "./UserLoginLogout";

const Home = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const [response, setResponse] = useState<object | undefined>(undefined);
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
  const val = (annotations: JsonError[]) => {
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
      const res = await saveQueryDb({
        username,
        ...queryToSave,
      });
      console.log(res.data);
      setSavedQueries(savedQueries.concat(queryToSave));
    } catch (e) {
      console.log(e);
    }

    // DELETE query from backend and from savedQueries
  };

  const handleDelete = (id: string) => {
    setSavedQueries(savedQueries.filter((query) => query.id !== id));
  };

  const selectQuery = (query: Query) => {
    setMethod(query.method);
    setUrl(query.url);
    if (query.query) {
      SetQuery(JSON.stringify(query.query, null, 2));
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
            Authorization: `${authorization} ${token}`,
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
    } catch (e) {
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
    setToken(null);
    setSavedQueries([]);
    setQueries([]);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  };

  return (
    <Container sx={{ textAlign: "center" }}>
      <UserLoginLogout token={token} handleLogOut={handleLogOut} />
      <p>https://jsonplaceholder.typicode.com/posts</p>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mb: 3,
          mt: 2,
        }}
      >
        <UrlBox onChange={onUrlChange} />
        <AuthSelector
          handleChange={handleAuth}
          handleToken={handleToken}
          authorization={authorization}
        />
      </Box>
      <AceEditor
        mode="json"
        theme="xcode"
        onChange={onQueryChange}
        name="placeholder"
        value={query}
        onValidate={val}
        width="80%"
        height="400px"
        setOptions={{
          useWorker: useErrors,
          fontSize: "16px",
        }}
        style={{ margin: "0.5rem auto 0.5rem auto", backgroundColor: "#eee" }}
      ></AceEditor>
      <Button
        variant="outlined"
        onClick={queryHandler}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Send query
      </Button>
      <Button
        variant="outlined"
        onClick={() => setUseErrors(!useErrors)}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Errors: {useErrors ? "On." : "Off."}
      </Button>
      <QueryList queries={queries} handleClick={selectQuery} />
      <SavedQueryList
        queries={savedQueries}
        handleClick={selectQuery}
        handleDelete={handleDelete}
      />
      <MethodSelector method={method} handleChange={handleMethod} />
      <Button
        variant="outlined"
        onClick={saveQuery}
        sx={{ fontWeight: "bold", borderWidth: "3px", backgroundColor: "#eee" }}
      >
        Save query
      </Button>
      <ResponseDisplay res={response} />
    </Container>
  );
};

export default Home;
