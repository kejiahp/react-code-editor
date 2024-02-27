import { PropsWithChildren, createContext, useRef, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import {
  CodeEditorFilesType,
  CodeEditorContextType,
} from "../types/context.types";
import { secure_store_keys } from "../constants/secure-store-keys";

export const CodeEditorContext = createContext<CodeEditorContextType>({
  editorRef: null,
  files: {},
  setFiles: () => alert("setFiles is undefined"),
});

export function CodeEditorProvider({ children }: PropsWithChildren) {
  const editorRef = useRef(null);
  const secureFiles = secureLocalStorage.getItem(
    secure_store_keys.files
  ) as string;
  const parsedSecureFiles = JSON.parse(secureFiles);
  const initFiles = parsedSecureFiles ? parsedSecureFiles : [];
  const [files, setFiles] =
    useState<Record<string, CodeEditorFilesType>>(initFiles);

  return (
    <CodeEditorContext.Provider
      value={{
        editorRef,
        files,
        setFiles,
      }}
    >
      {children}
    </CodeEditorContext.Provider>
  );
}
