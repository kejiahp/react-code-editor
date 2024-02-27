import { API } from "./axios-utils";

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
