import AceEditor from "react-ace";
import { useState, useEffect } from "react";
import axios from "axios";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

import type {
  JsonError,
  ResponseProps,
  UrlBoxProps,
  QueryHistoryProps,
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

const QueryHistory = ({ queries, handleClick }: QueryHistoryProps) => {
  return (
    <div>
      <ul>
        {queries.map((query, index) => (
          <li
            key={index}
            onClick={() => handleClick(JSON.stringify(query, null, 2))}
          >
            <QueryHistoryEntry res={query} />{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

const QueryHistoryEntry = ({ res }: ResponseProps) => {
  return (
    <div>
      <pre>{JSON.stringify(res, null, 2).slice(1, -1).replaceAll('"', "")}</pre>
    </div>
  );
};

const App = () => {
  const [query, SetQuery] = useState<string>("");
  const [useErrors, setUseErrors] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(""); // https://jsonplaceholder.typicode.com/posts
  const [response, setResponse] = useState<object | undefined>(undefined);
  const [queries, setQueries] = useState<object[]>([]);
  const [savedQueries, setSavedQueries] = useState<object[]>([]);
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
    setSavedQueries(savedQueries.concat(JSON.parse(query)));
    // POST query to backend
  };

  const selectQuery = (q: string) => {
    // Set clicked query as selected query
    console.log(q);
    SetQuery(q);
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
                Method: method,
                URL: url,
              })
            );
          }
          break;
        case "POST":
          {
            const res = await axios.post(url, parsedQuery);
            setQueries(queries.concat(parsedQuery));
            setResponse(res.data);
          }
          break;
        case "PUT":
          break;
        case "DELETE":
          break;
        default:
          throw new Error("Method not found.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <AceEditor
        mode="json"
        theme="monokai"
        onChange={onQueryChange}
        name="placeholder"
        value={query}
        onValidate={val}
        setOptions={{
          useWorker: useErrors,
        }}
      ></AceEditor>
      <button onClick={postQuery}>Post</button>
      <button onClick={() => setUseErrors(!useErrors)}>
        Errors: {useErrors ? "On." : "Off."}
      </button>
      <UrlBox onChange={onUrlChange} />
      <QueryHistory queries={queries} handleClick={selectQuery} />
      <button onClick={() => setMethod("GET")}>GET</button>
      <button onClick={() => setMethod("POST")}>POST</button>
      <button onClick={() => setMethod("PUT")}>PUT</button>
      <button onClick={() => setMethod("DELETE")}>DELETE</button>
      <button onClick={saveQuery}>Save query</button>
      <ResponseDisplay res={response} />
    </div>
  );
};

export default App;
