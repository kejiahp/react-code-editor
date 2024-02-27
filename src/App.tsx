import { CodeEditorProvider } from "./context/CodeEditor.context";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <CodeEditorProvider>
      <HomePage />
    </CodeEditorProvider>
  );
}

export default App;
