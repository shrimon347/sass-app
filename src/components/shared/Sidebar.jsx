import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChatAltIcon, CodeIcon, CogIcon, HomeIcon, MenuIcon, MusicNoteIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";

const Sidebar = () => {
  // State to track sidebar visibility on mobile
  const [isOpen, setIsOpen] = useState(false);

  // Get the current path to determine the active route
  const location = useLocation();


  const menuItems = [
    { name: "Dashboard", icon: <HomeIcon className="h-6 w-6 text-sky-600" />, path: "/" },
    { name: "Conversation", icon: <ChatAltIcon className="h-6 w-6 text-purple-600" />, path: "/conversation" },
    { name: "Image Generation", icon: <PhotographIcon className="h-6 w-6 text-pink-600" />, path: "/image" },
    { name: "Content Generation", icon: <VideoCameraIcon className="h-6 w-6 text-orange-600" />, path: "/content" },
    { name: "Music Generation", icon: <MusicNoteIcon className="h-6 w-6 text-green-600" />, path: "/music-generation" },
    { name: "Code Generation", icon: <CodeIcon className="h-6 w-6 text-green-800" />, path: "/code" },
    { name: "Settings", icon: <CogIcon className="h-6 w-6" />, path: "/settings" },
  ];

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle button for mobile */}
      <button
        className={`fixed top-4 z-50 md:hidden p-2 text-white rounded-lg focus:outline-none ${
          isOpen ? "left-[200px]" : "left-4 bg-gray-800"
        }`}
        onClick={toggleSidebar}
      >
        {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 text-gray-200 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:flex md:flex-col`}
      >
        <div className="p-6 text-2xl font-semibold text-white">Genius</div>
        <nav className="flex-1">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="flex items-center px-4 py-2">
                <Link
                  to={item.path}
                  className={`flex items-center w-full p-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-gray-700 font-semibold"
                      : "hover:bg-gray-700"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span className="ml-3">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
