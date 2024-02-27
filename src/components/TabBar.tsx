import { X } from "lucide-react";

type Props = {
  tabs: Array<{
    name: string;
    isActive: boolean;
  }>;
};

export default function TabBar({ tabs }: Props) {
  return (
    <section className="flex overflow-x-auto whitespace-nowrap items-center bg-slate-900">
      {tabs.map((item, index) => (
        <div
          key={index}
          className={`flex items-center ${item.isActive ? "bg-gray-500" : ""}`}
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
