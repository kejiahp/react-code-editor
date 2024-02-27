import { File, FilePlus, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import { ModalContext } from "../context/Modal.context";
import { CodeEditorContext } from "../context/CodeEditor.context";
import { LANGUAGE_EXTENSIONS } from "../constants/snippets-n-lang";
import { TabContext } from "../context/Tab.context";
import { secure_store_keys } from "../constants/secure-store-keys";
import { cn } from "../lib/utils";

const MINWIDTH = 180;
const MAXWIDTH = 300;
const DEFAULTWIDTH = 200;

export default function SideBar() {
  const [width, setWidth] = useState<number>(DEFAULTWIDTH);
  const modalContextProps = useContext(ModalContext);
  const { files } = useContext(CodeEditorContext);
  const { openFiles, setOpenFiles, setSelectedEditor, selectedEditor } =
    useContext(TabContext);

  const resize = (e: MouseEvent) => {
    if (e.clientX >= MINWIDTH && e.clientX <= MAXWIDTH) {
      const size = e.clientX;
      setWidth(size);
    }
  };

  useEffect(() => {
    const resizer = document.querySelector("#resizer");
    if (resizer) {
      resizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", resize);
        });
      });
    }
  }, [width]);

  const createFileHandler = () => {
    modalContextProps.setCreateModalIsOpen(true);
  };

  const initFileDelete = (name: string) => {
    modalContextProps.setFileToDelete(name);
    modalContextProps.setDeleteModalIsOpen(true);
  };

  const addTab = (name: string) => {
    const isFileInTab = openFiles.find((item) => item.name === name);
    setSelectedEditor(name);

    if (isFileInTab) {
      return;
    } else {
      setOpenFiles((oldState) => {
        const newState = [...oldState];
        newState.push({ name: name });

        secureLocalStorage.setItem(
          secure_store_keys.tabs,
          JSON.stringify(newState)
        );

        return newState;
      });
    }
  };

  return (
    <nav
      style={{
        width: width + "px",
      }}
      className="flex py-2 pl-2 bg-slate-900"
    >
      <div className="flex w-full flex-col gap-3 h-screen overflow-y-auto overflow-x-hidden">
        <ul>
          <li className="flex justify-between border-b border-gray-300 mb-2">
            <h1>Explorer</h1>
            <button
              type="button"
              onClick={createFileHandler}
              className="relative text-xs flex items-center gap-1 hover:bg-gray-500 p-1 rounded-xl transition-[background] ease-in-out duration-200 after:content-['New_File'] after:absolute after:top-0 after:-left-16 after:bg-gray-500 after:p-1 after:opacity-0 after:hover:opacity-100 after:z-10 after:delay-200"
            >
              <FilePlus size={18} />
            </button>
          </li>
          {Object.keys(files).map((item, index) => (
            <li key={index} className="relative">
              <button
                onClick={() => addTab(item)}
                className={cn(
                  "py-1 px-2 w-full text-left rounded-md text-sm hover:bg-gray-800 whitespace-nowrap overflow-ellipsis overflow-hidden border border-transparent my-[2px]",
                  item === selectedEditor && "bg-gray-800 border-gray-300"
                )}
              >
                <File size={15} className="inline mr-1" />
                {item}
                {LANGUAGE_EXTENSIONS[files[item].language]}
              </button>

              <button
                onClick={() => initFileDelete(item)}
                className="absolute top-0 bottom-0 right-2 my-auto"
              >
                <Trash2 size={14} className="text-red-500" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        id="resizer"
        className="w-2 cursor-col-resize bg-gray-300 ml-auto -mt-2 -mb-2"
      />
    </nav>
  );
}
