import { PropsWithChildren, createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import {
  CodeEditorFilesType,
  CodeEditorContextType,
} from "../types/context.types";

export const CodeEditorContext = createContext<CodeEditorContextType>({
  files: [],
  setFiles: () => alert("setFiles is undefined"),
});

export function CodeEditorProvider({ children }: PropsWithChildren) {
  const secureFiles = secureLocalStorage.getItem("files") as string;
  const parsedSecureFiles = JSON.parse(secureFiles);
  const initFiles = parsedSecureFiles ? parsedSecureFiles : [];
  const [files, setFiles] = useState<Array<CodeEditorFilesType>>(initFiles);

  return (
    <CodeEditorContext.Provider
      value={{
        files,
        setFiles,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
}
