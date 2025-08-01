import ace from "ace-builds/src-noconflict/ace";

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
