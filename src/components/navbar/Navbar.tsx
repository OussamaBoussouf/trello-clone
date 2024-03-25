import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="container mx-auto py-5 flex justify-between border-b-[1px]">
      <div>
        <a
          href="/"
          className="font-bold text-2xl text-transparent bg-gradient-to-b bg-clip-text from-cyan-500 to-blue-500"
        >
          Rello
        </a>
      </div>
      <div>
        <SignedIn>
          <div className="flex items-center">
            <div className="me-5">
              <Link to="/board" className="text-sm text-gray-500 underline underline-offset-2">Go to workspace</Link>
            </div>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button
              type="button"
              className="bg-light-blue py-2 px-4 rounded-md text-white font-bold border-[1px] border-dark-blue"
            >
              Sign in
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
}

export default Navbar;
