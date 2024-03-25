import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";
import Header from "./pages/home/Header";
import { useUser } from "@clerk/clerk-react";
import Board from "./pages/board/Board";
import Workspace from "./pages/workspace/Workspace";

type AuthProps = {
  children: JSX.Element;
};

function App() {
  const { isSignedIn } = useUser();

  const AuthRequired = ({ children }: AuthProps) =>
    isSignedIn ? <>{children}</> : <Header />;

  return (
    <>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Header />} />
          <Route
            path="/board"
            element={
              <AuthRequired>
                <Board/>
              </AuthRequired>
            }
          />
          <Route
            path="/board/workspace/:id"
            element={
              <AuthRequired>
                <Workspace/>
              </AuthRequired>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
