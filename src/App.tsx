import CreateFileModal from "./components/modals/CreateFileModal";
import DeleteFileModal from "./components/modals/DeleteFileModal";
import { CodeEditorProvider } from "./context/CodeEditor.context";
import { ModalProvider } from "./context/Modal.context";
import { TabProvider } from "./context/Tab.context";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <CodeEditorProvider>
      <ModalProvider>
        <TabProvider>
          <CreateFileModal />
          <DeleteFileModal />
          <HomePage />
        </TabProvider>
      </ModalProvider>
    </CodeEditorProvider>
  );
}

export default App;
