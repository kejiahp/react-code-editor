import { PropsWithChildren, createContext, useState } from "react";
import secureLocalStorage from "react-secure-storage";

import { TabContextType, TabFilesType } from "../types/context.types";

export const TabContext = createContext<TabContextType>({
  openFiles: [],
  setOpenFiles: () => alert("setOpenFiles is undefined"),
  selectedEditor: "",
  setSelectedEditor: () => alert("setSelectedEditor is undefined"),
});

export function TabProvider({ children }: PropsWithChildren) {
  const secureTabs = secureLocalStorage.getItem("tabs") as string;
  const parsedSecureTabs = JSON.parse(secureTabs);
  const initTabs = parsedSecureTabs ? parsedSecureTabs : [];
  const [openFiles, setOpenFiles] = useState<TabFilesType[]>(initTabs);
  const [selectedEditor, setSelectedEditor] = useState<string>("");

  return (
    <TabContext.Provider
      value={{
        openFiles,
        setOpenFiles,
        selectedEditor,
        setSelectedEditor,
      }}
    >
      {children}
    </TabContext.Provider>
  );
}
