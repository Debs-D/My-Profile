import { useEffect, useRef, useState } from "react";

function Nav() {
  const list = useRef(null);
  const [darkMode, setDarkMode] = useState(() => {
    // Get preference from localStorage
    const storedMode = localStorage.getItem("darkMode");
    return storedMode === "true";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    // Save preference
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function scroll(id) {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <header className="flex items-center justify-between px-6 md:px-4 py-4 bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between gap-4">
        <div className="w-32 text-3xl font-semibold bg-gradient-to-r from-blue-500 to-red-300 bg-clip-text text-transparent">
          Lolaa..
        </div>
      </div>

      <div
        className="fixed w-[60%] shadow-lg md:shadow-none top-0 right-0 z-20 px-8 h-screen md:flex justify-between items-center gap-8 transition-all duration-100 translate-x-[50rem] md:translate-x-0 bg-slate-600 md:bg-transparent"
        ref={list}
      >
        <ul className="mt-20 md:mt-0 md:flex items-center justify-between gap-3 text-sm font-semibold text-white md:text-black dark:text-white">
          <li
            onClick={() => scroll("home")}
            className="cursor-pointer hover:text-blue-400"
          >
            Home
          </li>
          <li
            onClick={() => scroll("tech")}
            className="cursor-pointer hover:text-blue-400"
          >
            Tech Stack
          </li>
          <li
            onClick={() => scroll("project")}
            className="cursor-pointer hover:text-blue-400"
          >
            Project
          </li>
          <li
            onClick={() => scroll("contact")}
            className="cursor-pointer hover:text-blue-400"
          >
            Contact
          </li>
        </ul>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-4 py-1 border rounded-md text-sm font-medium dark:text-white dark:border-white text-gray-800 border-gray-800"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
}

export default Nav;
