import type { ResponseProps } from "../types";

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

export default ResponseDisplay;
