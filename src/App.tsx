import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import axios from "axios";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import type {
  JsonError,
  ResponseProps,
  UrlBoxProps,
  QueryListProps,
  Query,
} from "./types";
import { configAce } from "./utils";

const ResponseDisplay = ({ res }: ResponseProps) => {
  if (!res) {
    return null;
  }
  return (
    <div>
      <pre>
        Response:
        {JSON.stringify(res, null, 2).slice(1, -1)}
      </pre>
    </div>
  );
};

const UrlBox = ({ onChange }: UrlBoxProps) => {
  return (
    <input
      type="text"
      placeholder="Enter URL"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const QueryList = ({ queries, handleClick }: QueryListProps) => {
  return (
    <div>
      <ul>
        {queries.map((query, index) => (
          <li key={index} onClick={() => handleClick(query)}>
            <QueryListEntry
              query={query.query}
              method={query.method}
              url={query.url}
            />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

const QueryListEntry = ({ query, method, url }: Query) => {
  if (!query) {
    return (
      <div>
        <p>Method: {method}</p>
        <p>Url: {url}</p>
      </div>
    );
  }
  return (
    <div>
      <pre>
        <p>Method: {method}</p>
        <p>Url: {url}</p>
        Query: {JSON.stringify(query, null, 2).slice(1, -1).replaceAll('"', "")}
      </pre>
    </div>
  );
};

const App = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(""); // https://jsonplaceholder.typicode.com/posts
  const [response, setResponse] = useState<object | undefined>(undefined);
  const [queries, setQueries] = useState<Query[]>([]);
  const [savedQueries, setSavedQueries] = useState<Query[]>([]);
  const [method, setMethod] = useState<string>("GET");

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
        method,
        query: query ? JSON.parse(query) : undefined,
        url,
      })
    );
    // POST query to backend
  };

  const selectQuery = (query: Query) => {
    setMethod(query.method);
    setUrl(query.url);
    if (query.query) {
      SetQuery(JSON.stringify(query.query, null, 2));
    }
    console.log(query);
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
            const res = await axios.get(url);
            setResponse(res.data);
            setQueries(
              queries.concat({
                method,
                query: undefined,
                url,
              })
            );
          }
          break;
        case "POST":
          {
            const res = await axios.post(url, parsedQuery);
            setQueries(
              queries.concat({
                method,
                query: parsedQuery,
                url,
              })
            );
            setResponse(res.data);
          }
          break;
        case "PUT":
          {
            const res = await axios.put(url, parsedQuery);
            setQueries(
              queries.concat({
                method,
                query: parsedQuery,
                url,
              })
            );
            setResponse(res.data);
          }
          break;
        case "DELETE":
          {
            const res = await axios.delete(url);
            setResponse(res.data);
            setQueries(
              queries.concat({
                method,
                query: undefined,
                url,
              })
            );
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
      <QueryList queries={savedQueries} handleClick={selectQuery} />
      <button onClick={() => setMethod("GET")}>GET</button>
      <button onClick={() => setMethod("POST")}>POST</button>
      <button onClick={() => setMethod("PUT")}>PUT</button>
      <button onClick={() => setMethod("DELETE")}>DELETE</button>
      <button onClick={saveQuery}>Save query</button>
      <ResponseDisplay res={response} />
    </Container>
  );
};

export default App;
