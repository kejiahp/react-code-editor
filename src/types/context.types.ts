import { SetStateAction } from "react";

export type CodeEditorFilesType = {
  name: string;
  value: string;
  language: string;
  version: string;
};

export type CodeEditorContextType = {
  editorRef: React.MutableRefObject<null> | null;
  files: Record<string, CodeEditorFilesType>;
  setFiles: React.Dispatch<
    React.SetStateAction<Record<string, CodeEditorFilesType>>
  >;
};

export type CreateModalContextType = {
  createModalIsOpen: boolean;
  setCreateModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export type TabFilesType = {
  name: string;
};

export type TabContextType = {
  openFiles: TabFilesType[];
  setOpenFiles: React.Dispatch<SetStateAction<TabFilesType[]>>;
  selectedEditor: string;
  setSelectedEditor: React.Dispatch<React.SetStateAction<string>>;
};
