import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { configAce } from "../utils";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import type { Config, JsonError, Query } from "../types";

import ResponseDisplay from "./ResponseDisplay";

import UrlBox from "./UrlBox";
import QueryList from "./QueryList";
import SavedQueryList from "./SavedQueryList";

const Home = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(true);
  const [url, setUrl] = useState<string>(""); // https://jsonplaceholder.typicode.com/posts
  const [response, setResponse] = useState<object | undefined>(undefined);
  const [queries, setQueries] = useState<Query[]>([]);
  const [savedQueries, setSavedQueries] = useState<Query[]>([]);
  const [method, setMethod] = useState<string>("GET");
  const [config, setConfig] = useState<Config | undefined>();

  const onUrlChange = (value: string) => {
    setUrl(value);
  };

  const onQueryChange = (value: string) => {
    SetQuery(value);
  };

  useEffect(() => {
    configAce();
    // getSavedQueries
  }, []);

  const val = (annotations: JsonError[]) => {
    console.log(annotations);
  };

  const saveQuery = () => {
    setSavedQueries(
      savedQueries.concat({
        id: uuidv4(),
        method,
        query: query ? JSON.parse(query) : undefined,
        url,
      })
    );
    // POST query to backend
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

  const includesQuery = (query: Query): boolean => {
    queries.forEach((q) => {
      if (
        q.method === query.method &&
        q.url === query.url &&
        q.query === query.query
      ) {
        return true;
      }
    });
    return false;
  };

  const postQuery = async () => {
    try {
      let parsedQuery;
      if (query) {
        parsedQuery = JSON.parse(query);
      }

      switch (method) {
        case "GET":
          {
            const res = await axios.get(url, undefined);
            setResponse(res.data);
            const userQuery: Query = {
              id: uuidv4(),
              method,
              query: undefined,
              url,
            };
            if (!includesQuery(userQuery) && queries.length === 0) {
              setQueries(queries.concat(userQuery));
            }
          }
          break;
        case "POST":
          {
            const res = await axios.post(url, parsedQuery);
            console.log(res.data);
            const userQuery: Query = {
              id: uuidv4(),
              method,
              query: parsedQuery,
              url,
            };
            if (!includesQuery(userQuery) && queries.length === 0) {
              setQueries(queries.concat(userQuery));
            }
            setResponse(res.data);
          }
          break;
        case "PUT":
          {
            const res = await axios.put(url, parsedQuery);
            const userQuery: Query = {
              id: uuidv4(),
              method,
              query: parsedQuery,
              url,
            };
            if (!includesQuery(userQuery) && queries.length === 0) {
              setQueries(queries.concat(userQuery));
            }
            setResponse(res.data);
          }
          break;
        case "DELETE":
          {
            const res = await axios.delete(url);
            setResponse(res.data);
            const userQuery: Query = {
              id: uuidv4(),
              method,
              query: undefined,
              url,
            };
            if (!includesQuery(userQuery) && queries.length === 0) {
              setQueries(queries.concat(userQuery));
            }
          }
          break;
        default:
          throw new Error("Method not found.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <p>https://jsonplaceholder.typicode.com/posts</p>
      <AceEditor
        mode="json"
        theme="monokai"
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
      ></AceEditor>
      <button onClick={postQuery}>Post</button>
      <button onClick={() => setUseErrors(!useErrors)}>
        Errors: {useErrors ? "On." : "Off."}
      </button>
      <UrlBox onChange={onUrlChange} />
      <QueryList queries={queries} handleClick={selectQuery} />
      <SavedQueryList
        queries={savedQueries}
        handleClick={selectQuery}
        handleDelete={handleDelete}
      />
      <button onClick={() => setMethod("GET")}>GET</button>
      <button onClick={() => setMethod("POST")}>POST</button>
      <button onClick={() => setMethod("PUT")}>PUT</button>
      <button onClick={() => setMethod("DELETE")}>DELETE</button>
      <button onClick={saveQuery}>Save query</button>
      <ResponseDisplay res={response} />
    </Container>
  );
};

export default Home;
