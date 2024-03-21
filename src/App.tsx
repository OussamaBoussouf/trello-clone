import { Route, Routes } from "react-router-dom";
import Workspace from "./pages/workspace/Workspace";
import RootLayout from "./pages/layout/RootLayout";
import Header from "./pages/home/Header";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Header />} />
          <Route path="/workspace" element={<Workspace />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
