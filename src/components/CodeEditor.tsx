import { Editor, OnMount } from "@monaco-editor/react";
import { useContext, useEffect } from "react";
import { CodeEditorContext } from "../context/CodeEditor.context";
import { TabContext } from "../context/Tab.context";
import { secure_store_keys } from "../constants/secure-store-keys";
import secureLocalStorage from "react-secure-storage";
import EmptyState from "./EmptyState";

export default function CodeEditor() {
  const { editorRef, files, setFiles } = useContext(CodeEditorContext);
  const { selectedEditor, openFiles } = useContext(TabContext);

  const onMountHandler: OnMount = (editor) => {
    //@ts-expect-error Type 'IStandaloneCodeEditor' is not assignable to type 'null'.
    editorRef.current = editor;
    editor.focus();
  };

  const mainFile = files[selectedEditor];

  const onFileEditChangeHandler = (e: string) => {
    if (!mainFile) {
      return;
    }

    setFiles((oldState) => {
      const newState = { ...oldState };
      newState[selectedEditor] = {
        ...newState[selectedEditor],
        value: e,
      };

      return newState;
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (mainFile && openFiles.length > 0) {
        secureLocalStorage.setItem(
          secure_store_keys.files,
          JSON.stringify(files)
        );
        console.log("saved");
      }
    }, 5000);

    // clearing interval
    return () => clearInterval(timer);
  });

  if (!mainFile) {
    return <EmptyState />;
    // return <h1 className="font-bold">Nothing to see here</h1>;
  }

  return (
    <Editor
      theme="vs-light"
      language={mainFile.language}
      onMount={onMountHandler}
      path={mainFile.name}
      value={mainFile.value}
      onChange={(value) => onFileEditChangeHandler(value || "")}
    />
  );
}
