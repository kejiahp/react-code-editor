import CodeEditor from "../components/CodeEditor";
import Console from "../components/console/Console";
import SideBar from "../components/SideBar";
import TabBar from "../components/TabBar";

export default function HomePage() {
  return (
    <div className="bg-gray-800 text-white h-screen grid grid-cols-[max-content_auto]">
      <SideBar />
      <main className="relative w-full overflow-hidden">
        <TabBar />
        <CodeEditor />
        <Console />
      </main>
    </div>
  );
}
