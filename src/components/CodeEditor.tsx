import { Editor, OnMount } from "@monaco-editor/react";
import { useRef, useState } from "react";
// import { editor } from 'monaco-editor';

//editor.IStandaloneCodeEditor

export default function CodeEditor() {
  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMountHandler: OnMount = (editor) => {
    //@ts-expect-error inital null value of useRef used in the editor is not recommended
    editorRef.current = editor;
    editor.focus();
  };

  //   const onSelect = (language) => {
  //     setLanguage(language);
  //     setValue(CODE_SNIPPETS[language]);
  //   };

  return (
    <Editor
      theme="vs-light"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      language={language}
      //   defaultValue={CODE_SNIPPETS[language]}
      onMount={onMountHandler}
      value={value}
      onChange={(value) => setValue(value || "")}
    />
  );
}
