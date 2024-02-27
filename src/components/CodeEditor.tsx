import { Editor, OnMount } from "@monaco-editor/react";
import { useContext } from "react";
import { CodeEditorContext } from "../context/CodeEditor.context";
import { TabContext } from "../context/Tab.context";

export default function CodeEditor() {
  const { editorRef, files, setFiles } = useContext(CodeEditorContext);
  const { selectedEditor } = useContext(TabContext);

  const onMountHandler: OnMount = (editor) => {
    //@ts-expect-error inital null value of useRef used in the editor is not recommended
    editorRef.current = editor;
    editor.focus();
  };

  const mainFile = files.find((item) => item.name === selectedEditor);

  const onFileEditChangeHandler = (e: string) => {
    if (!mainFile) {
      return;
    }

    setFiles((oldState) => {
      let newState = [...oldState];
      mainFile.value = e;

      newState = newState.filter((item) => item.name !== selectedEditor);
      newState.push(mainFile);
      return newState;
    });
  };

  if (!mainFile) {
    return <h1 className="font-bold">Nothing to see here</h1>;
  }

  console.log(mainFile);

  return (
    <Editor
      theme="vs-light"
      language={mainFile.language}
      // defaultValue={CODE_SNIPPETS[mainFile.language] || "// some comment"}
      onMount={onMountHandler}
      path={mainFile.name}
      value={mainFile.value}
      onChange={(value) => onFileEditChangeHandler(value || "")}
    />
  );
}
