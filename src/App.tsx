import { Route, Routes, useNavigate } from "react-router-dom";
import Workspace from "./pages/workspace/Workspace";
import RootLayout from "./pages/layout/RootLayout";
import Header from "./pages/home/Header";
import RelloBoard from "./pages/rello-board/RelloBoard";
import { SignedIn, useUser } from "@clerk/clerk-react";
import React from "react";

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
                <Workspace />
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
