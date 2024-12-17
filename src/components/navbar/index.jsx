import { useEffect, useState } from "react";
import Image from "../image";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  useAuth,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  return (
    <div className="w-full h-16 flex items-center justify-between">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3 text-lg font-bold">
        <Image src="logo.png" alt="logo" width={28} height={28} />
        <span>B-LOG</span>
      </Link>
      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* MOBILE BUTTON */}
        <div
          className="cursor-pointer text-lg font-bold"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "X" : "☰"}
        </div>
        {/* MOBILE MENU LIST */}
        <div
          className={`bg-[#E6E6FF] z-50 py-20 h-screen w-full flex flex-col items-center gap-8 font-medium absolute top-16 transition-all ease-in-out ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/">
            <SignedOut>
              <Link to="/login" onClick={() => setOpen((prev) => !prev)}>
                <button className="py-2 px-4 rounded-2xl bg-blue-800 text-white">
                  Login 👋
                </button>
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Link>
          <Link onClick={() => setOpen((prev) => !prev)} to="/">
            Home
          </Link>
          <Link
            onClick={() => setOpen((prev) => !prev)}
            to="/posts?sort=trending"
          >
            Trending
          </Link>
          <Link
            onClick={() => setOpen((prev) => !prev)}
            to="/posts?sort=popular"
          >
            Most Popular
          </Link>
          <Link
            onClick={() => setOpen((prev) => !prev)}
            to="/posts?cat=web-design"
          >
            Web Design
          </Link>
        </div>
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center text-sm gap-8 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/posts?cat=web-design">Web Design</Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-2xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
