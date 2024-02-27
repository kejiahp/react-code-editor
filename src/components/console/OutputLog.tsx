import { PlayCircle } from "lucide-react";
import { useContext, useState } from "react";

import { TabContext } from "../../context/Tab.context";
import { CodeEditorContext } from "../../context/CodeEditor.context";
import { executeCode } from "../../api/piston.api";
import { AxiosError } from "axios";
import { cn } from "../../lib/utils";

export default function OutputLog() {
  const [output, setOutput] = useState<null | string[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { selectedEditor } = useContext(TabContext);
  const { files, editorRef } = useContext(CodeEditorContext);

  const mainFile = files.find((item) => item.name === selectedEditor);

  const runCode = async () => {
    if (!mainFile) {
      return;
    }
    //@ts-expect-error getValue does not exist on ref
    const sourceCode = editorRef?.current?.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(
        mainFile.language,
        sourceCode,
        mainFile.version
      );
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error: unknown) {
      console.log(error);
      if (error instanceof AxiosError) {
        alert("An error occurred." + (error.message || "Unable to run code"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center ml-2 border-b border-gray-300 py-2">
        <h1>Terminal</h1>
        {mainFile && (
          <button
            onClick={runCode}
            disabled={isLoading}
            className="flex items-center px-2 py-1 bg-green-500 text-white rounded-md mr-5 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <PlayCircle size={16} className="mr-1" />
            <p className="text-sm">Run</p>
          </button>
        )}
      </div>
      {mainFile ? (
        <div
          className={cn(
            "p-2 pb-10 h-full overflow-auto text-gray-300",
            isError && "text-red-500"
          )}
        >
          {output
            ? output.map((line, index) => <p key={index}>{line}</p>)
            : 'Click "Run" to see the output here'}
        </div>
      ) : (
        <p className="p-2 pb-10 h-full overflow-auto text-gray-300">
          Select a file
        </p>
      )}
    </>
  );
}
