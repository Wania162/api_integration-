import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";

import { logout } from "@/redux/slices/authSlice";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
      isActive
        ? "bg-white text-black font-semibold"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}

          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="bg-white text-black rounded-lg p-2">
              📁
            </div>

            <h1 className="text-2xl font-bold tracking-wide">
              DMS
            </h1>
          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-3">

            <NavLink
              to="/dashboard"
              className={linkStyle}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/posts"
              className={linkStyle}
            >
              <FileText size={18} />
              Posts
            </NavLink>

            <NavLink
              to="/add-post"
              className={linkStyle}
            >
              <PlusSquare size={18} />
              Add Post
            </NavLink>

            <NavLink
              to="/profile"
              className={linkStyle}
            >
              <User size={18} />
              Profile
            </NavLink>

          </div>

          {/* Right Side */}

          <div className="hidden md:flex items-center gap-4">

            <div className="text-right">
              <p className="text-sm text-gray-400">
                Welcome
              </p>

              <p className="font-medium text-sm">
                {user?.email}
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={handleLogout}
              className="bg-white text-black hover:bg-gray-300"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>

          </div>

          {/* Mobile Button */}

          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}

        {open && (
          <div className="md:hidden py-5 space-y-2">

            <NavLink
              to="/dashboard"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/posts"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              <FileText size={18} />
              Posts
            </NavLink>

            <NavLink
              to="/add-post"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              <PlusSquare size={18} />
              Add Post
            </NavLink>

            <NavLink
              to="/profile"
              className={linkStyle}
              onClick={() => setOpen(false)}
            >
              <User size={18} />
              Profile
            </NavLink>

            <Button
              onClick={handleLogout}
              className="w-full mt-4 bg-white text-black hover:bg-gray-300"
            >
              <LogOut size={18} className="mr-2" />
              Logout
            </Button>

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;