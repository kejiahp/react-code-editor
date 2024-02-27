import { PropsWithChildren, createContext, useState } from "react";
import { CreateModalContextType } from "../types/context.types";

export const ModalContext = createContext<CreateModalContextType>({
  createModalIsOpen: false,
  setCreateModalIsOpen: () => alert("setCreateModalIsOpen is undefined"),
  deleteModalIsOpen: false,
  setDeleteModalIsOpen: () => alert("setDeleteModalIsOpen is undefined"),
  fileToDelete: "",
  setFileToDelete: () => alert("setFileToDelete is undefined"),
});

export function ModalProvider({ children }: PropsWithChildren) {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState<boolean>(false);
  const [fileToDelete, setFileToDelete] = useState<string>("");

  return (
    <ModalContext.Provider
      value={{
        createModalIsOpen,
        setCreateModalIsOpen,
        deleteModalIsOpen,
        setDeleteModalIsOpen,
        fileToDelete,
        setFileToDelete,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
