import { X } from "lucide-react";
import { useContext } from "react";
import { TabContext } from "../context/Tab.context";

type Props = {
  tabs: Array<{
    name: string;
    isActive: boolean;
  }>;
};

export default function TabBar({ tabs }: Props) {
  const { openFiles, selectedEditor } = useContext(TabContext);
  return (
    <section className="flex overflow-x-auto whitespace-nowrap items-center bg-slate-900 min-h-7">
      {openFiles.map((item, index) => (
        <div
          key={index}
          className={`flex items-center ${
            item.name === selectedEditor ? "bg-gray-500" : ""
          }`}
        >
          <button className="flex items-center justify-center p-2 hover:bg-gray-500 text-sm transition-colors ease-in-out">
            {item.name}
          </button>
          <button className="p-1 hover:bg-gray-500">
            <X size={14} className="text-red-500" />
          </button>
        </div>
      ))}
    </section>
  );
}
