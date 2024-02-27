export type CodeEditorFilesType = {
  name: string;
  language: string;
  value: string;
};

export type CodeEditorContextType = {
  files: CodeEditorFilesType[];
  setFiles: React.Dispatch<React.SetStateAction<CodeEditorFilesType[]>>;
};
