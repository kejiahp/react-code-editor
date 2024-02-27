import { PropsWithChildren, createContext, useState } from "react";
import { CreateModalContextType } from "../types/context.types";

export const ModalContext = createContext<CreateModalContextType>({
  createModalIsOpen: false,
  setCreateModalIsOpen: () => alert("setCreateModal is undefined"),
});

export function ModalProvider({ children }: PropsWithChildren) {
  const [createModalIsOpen, setCreateModalIsOpen] = useState<boolean>(false);

  return (
    <ModalContext.Provider
      value={{
        createModalIsOpen,
        setCreateModalIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
