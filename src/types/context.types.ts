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
  deleteModalIsOpen: boolean;
  setDeleteModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileToDelete: string;
  setFileToDelete: React.Dispatch<React.SetStateAction<string>>;
};
export type TabFilesType = {
  name: string;
};

export type TabContextType = {
  openFiles: TabFilesType[];
  setOpenFiles: React.Dispatch<React.SetStateAction<TabFilesType[]>>;
  selectedEditor: string;
  setSelectedEditor: React.Dispatch<React.SetStateAction<string>>;
};
