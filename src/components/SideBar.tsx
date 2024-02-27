import { FilePlus } from "lucide-react";
import { useEffect, useState } from "react";

const MINWIDTH = 180;
const MAXWIDTH = 300;
const DEFAULTWIDTH = 200;

export default function SideBar() {
  const [width, setWidth] = useState<number>(DEFAULTWIDTH);

  const resize = (e: MouseEvent) => {
    if (e.clientX >= MINWIDTH && e.clientX <= MAXWIDTH) {
      const size = e.clientX;
      setWidth(size);
    }
  };

  useEffect(() => {
    const resizer = document.querySelector("#resizer");
    if (resizer) {
      resizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", resize);
        });
      });
    }
  }, [width]);

  return (
    <nav
      style={{
        width: width + "px",
      }}
      className="flex py-2 pl-2 bg-slate-900"
    >
      <div className="flex w-full flex-col gap-3">
        <ul>
          <li className="flex justify-between border-b border-gray-300">
            <h1>Explorer</h1>
            <button
              type="button"
              className="relative text-xs flex items-center gap-1 hover:bg-gray-500 p-1 rounded-xl transition-[background] ease-in-out duration-200 after:content-['New_File'] after:absolute after:-bottom-7 after:-right-10 after:bg-gray-500 after:p-1 after:opacity-0 after:hover:opacity-100 after:z-10 after:delay-200"
            >
              <FilePlus size={15} />
            </button>
          </li>
          <li></li>
        </ul>
      </div>
      <div
        id="resizer"
        className="w-2 cursor-col-resize bg-gray-300 ml-auto -mt-2 -mb-2"
      />
    </nav>
  );
}
