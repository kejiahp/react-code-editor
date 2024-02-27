import { PropsWithChildren, createContext, useState } from "react";
import {
  CodeEditorFilesType,
  CodeEditorContextType,
} from "../types/context.types";

export const CodeEditorContext = createContext<CodeEditorContextType>({
  files: [],
  setFiles: () => alert("setFiles is undefined"),
});

export function CodeEditorProvider({ children }: PropsWithChildren) {
  const [files, setFiles] = useState<Array<CodeEditorFilesType>>([]);

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
