import { X } from "lucide-react";
import { useContext } from "react";
import { TabContext } from "../context/Tab.context";
import secureLocalStorage from "react-secure-storage";
import { secure_store_keys } from "../constants/secure-store-keys";
import { cn } from "../lib/utils";

export default function TabBar() {
  const { openFiles, setOpenFiles, selectedEditor, setSelectedEditor } =
    useContext(TabContext);

  const removeFromTab = (name: string) => {
    const values = openFiles.filter((item) => item.name !== name);

    const firstFile = values[0];
    if (firstFile) {
      setSelectedEditor(firstFile.name);
    } else {
      setSelectedEditor("");
    }

    setOpenFiles((oldstate) => {
      const newState = [...oldstate];
      const valuesx = newState.filter((item) => item.name !== name);

      secureLocalStorage.setItem(
        secure_store_keys.tabs,
        JSON.stringify(values)
      );

      return valuesx;
    });
  };

  return (
    <section className="flex overflow-x-auto whitespace-nowrap items-center bg-slate-900 min-h-7">
      {openFiles.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center",
            item.name === selectedEditor && "bg-gray-500"
          )}
        >
          <button
            onClick={() => setSelectedEditor(item.name)}
            className="flex items-center justify-center p-2 hover:bg-gray-500 text-sm transition-colors ease-in-out"
          >
            {item.name}
          </button>
          <button
            onClick={() => removeFromTab(item.name)}
            className="p-1 hover:bg-gray-500"
          >
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ))}
    </section>
  );
}
