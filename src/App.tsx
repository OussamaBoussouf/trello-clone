import { Route, Routes } from "react-router-dom";
import RootLayout from "./pages/layout/RootLayout";
import Header from "./pages/home/Header";
import RelloBoard from "./pages/rello-board/RelloBoard";
import { useUser } from "@clerk/clerk-react";
import Board from "./pages/workspace/Board";

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
            path="/workspace"
            element={
              <AuthRequired>
                <Board/>
              </AuthRequired>
            }
          />
          <Route
            path="/workspace/rello-board"
            element={
              <AuthRequired>
                <RelloBoard />
              </AuthRequired>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
