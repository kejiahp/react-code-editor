import { X } from "lucide-react";
import secureLocalStorage from "react-secure-storage";

import Backdrop from "../ui/Backdrop";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Select } from "../ui/Select";
import {
  CODE_SNIPPETS,
  LANGUAGE_VERSIONS,
} from "../../constants/snippets-n-lang";
import { useContext, useState } from "react";
import { cn } from "../../lib/utils";
import { CodeEditorContext } from "../../context/CodeEditor.context";
import { ModalContext } from "../../context/Modal.context";
import { secure_store_keys } from "../../constants/secure-store-keys";

export default function CreateFileModal() {
  const [name, setName] = useState<string>("");
  const [language, setLanguage] = useState<string>("typescript");
  const { files, setFiles } = useContext(CodeEditorContext);
  const { createModalIsOpen, setCreateModalIsOpen } = useContext(ModalContext);

  const options = Object.entries(LANGUAGE_VERSIONS).map((item) => {
    return { label: item[0] + " - " + item[1], value: item[0] };
  });

  const closeModal = () => {
    setCreateModalIsOpen(false);
    setName("");
  };

  const onSubmitHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (name.length <= 2) {
      return;
    }
    if (language === "") {
      return;
    }

    const fileWithNameExist = files[name];

    if (fileWithNameExist) {
      alert("A file with this name already exists");
    } else {
      const result = {
        name: name,
        value: CODE_SNIPPETS[language] || "// some comment",
        language: language,
        version: LANGUAGE_VERSIONS[language],
      };

      setFiles((oldState) => {
        const newState = { ...oldState };
        newState[name] = result;

        secureLocalStorage.setItem(
          secure_store_keys.files,
          JSON.stringify(newState)
        );

        return newState;
      });

      // alert("new file created");
      closeModal();
    }
  };

  if (!createModalIsOpen) {
    return;
  }

  return (
    <Backdrop onClick={closeModal} className="flex items-center justify-center">
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative p-5 rounded-md bg-white shadow-md"
      >
        <h1 className="text-slate-500 dark:text-slate-950 text-lg font-medium">
          Create file
        </h1>

        <form className="mt-3">
          <div>
            <Label className="text-sm font-medium">File Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value.trim())}
            />

            <p
              className={cn(
                "text-red-500 text-xs mt-1 hidden transition-all ease-in-out",
                name !== "" && name.length <= 2 ? "block" : ""
              )}
            >
              name must be greater than 2 characters
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium">Language & Version</Label>
            <Select
              options={options}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={onSubmitHandler}
            disabled={name.length <= 2 || language === ""}
            className="text-white bg-slate-950 p-1 px-2 border border-gray-300 rounded-md mt-2 text-sm disabled:opacity-20 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </form>

        <button
          type="button"
          onClick={closeModal}
          className="absolute top-2 right-2 text-slate-500 dark:text-slate-950"
        >
          <X size={20} />
        </button>
      </section>
    </Backdrop>
  );
}
