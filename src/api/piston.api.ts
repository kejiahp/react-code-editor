import { API } from "./axios-utils";

export async function getAllRuntimes() {
  const res = await API.get("/runtimes");
  return res.data;
}

export async function executeCode(
  language: string,
  sourceCode: string,
  version: string
) {
  const res = await API.post("/execute", {
    language: language,
    version: version,
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return res.data;
}
