import { useEffect, useState } from "react";

const MINHEIGHT = 150;
const DEFAULTHEIGHT = 200;

export default function Console() {
  const [height, setHeight] = useState<number>(DEFAULTHEIGHT);

  const resize = (e: MouseEvent) => {
    const size = e.clientY;
    const maxViewportHeight = window.innerHeight;
    const consoleHeight = maxViewportHeight - size;

    if (
      consoleHeight >= MINHEIGHT &&
      consoleHeight <= maxViewportHeight - 100
    ) {
      setHeight(consoleHeight);
    }
  };

  useEffect(() => {
    const resizer = document.querySelector("#console-resize");
    if (resizer) {
      resizer.addEventListener("mousedown", (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", resize);
        document.addEventListener("mouseup", () => {
          document.removeEventListener("mousemove", resize);
        });
      });
    }
  }, [height]);

  return (
    <footer
      style={{
        height: height + "px",
      }}
      className="bg-slate-900 absolute bottom-0 left-0 w-full"
    >
      <div
        id="console-resize"
        className="h-2 bg-gray-300 w-full cursor-row-resize"
      />
      <h1 className="ml-2 border-b border-gray-300">Terminal</h1>
      <div className="p-2 pb-10 h-full overflow-auto">
        <h1>Console LOG</h1>
      </div>
    </footer>
  );
}
