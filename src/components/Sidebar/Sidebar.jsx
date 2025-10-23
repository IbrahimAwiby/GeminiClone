import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import {
  FiPlus,
  FiMessageSquare,
  FiHelpCircle,
  FiClock,
  FiSettings,
  FiChevronLeft,
  FiChevronRight,
  FiTrash2,
  FiMenu,
  FiX,
  FiSun,
  FiMoon, // Added FiMoon import
} from "react-icons/fi";

const Sidebar = () => {
  const [extended, setExtended] = useState(true);
  const {
    onSent,
    prevPrompts,
    setRecentPrompt,
    newChat,
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    clearChatHistory,
    deleteChat,
    darkMode,
    toggleDarkMode,
  } = useContext(Context);

  // Close sidebar on mobile when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && sidebarOpen) {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar && !sidebar.contains(event.target)) {
          closeSidebar();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen, closeSidebar]);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  const menuItems = [
    {
      icon: <FiHelpCircle className="w-5 h-5" />,
      label: "Help",
      action: () => alert("Help section coming soon!"),
    },
    {
      icon: <FiClock className="w-5 h-5" />,
      label: "Activity",
      action: () => alert("Activity history coming soon!"),
    },
    {
      icon: <FiSettings className="w-5 h-5" />,
      label: "Settings",
      action: () => alert("Settings panel coming soon!"),
    },
  ];

  // Mobile overlay
  if (!sidebarOpen && window.innerWidth < 768) {
    return (
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-gemini-500 text-white shadow-lg"
      >
        <FiMenu className="w-6 h-6" />
      </button>
    );
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && window.innerWidth < 768 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        sidebar fixed md:static inset-y-0 left-0 z-40
        flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        transition-all duration-300 transform
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        ${extended ? "w-80 md:w-64" : "w-20"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {extended && (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold bg-gradient-to-r from-gemini-500 to-purple-600 bg-clip-text text-transparent">
                Gemini Awiby
              </span>
            </div>
          )}

          <div className="flex items-center space-x-2">
            {/* Mobile close button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>

            {/* Toggle sidebar extension */}
            <button
              onClick={() => setExtended(!extended)}
              className="hidden md:flex p-2 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {extended ? (
                <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* New Chat Button */}
            <button
              onClick={newChat}
              className="w-full p-3 mb-6 rounded-lg bg-gemini-500 hover:bg-gemini-600 text-white transition-colors flex items-center justify-center space-x-3 group"
            >
              <FiPlus className="w-5 h-5" />
              {extended && <span className="font-medium">New Chat</span>}
            </button>

            {/* Recent Chats */}
            {extended && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Recent Chats
                  </h3>
                  {prevPrompts.length > 0 && (
                    <button
                      onClick={clearChatHistory}
                      className="text-xs text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      title="Clear all chats"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-2">
                  {prevPrompts.slice(0, 15).map((item, index) => (
                    <div
                      key={index}
                      className="group relative p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <button
                        onClick={() => loadPrompt(item)}
                        className="w-full text-left flex items-center space-x-3"
                      >
                        <FiMessageSquare className="w-4 h-4 text-gray-400 group-hover:text-gemini-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 dark:text-gray-300 truncate flex-1">
                          {item.slice(0, 35)}...
                        </span>
                      </button>

                      {/* Delete individual chat button */}
                      <button
                        onClick={() => deleteChat(item)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                        title="Delete this chat"
                      >
                        <FiTrash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  {prevPrompts.length === 0 && (
                    <div className="text-center py-8">
                      <FiMessageSquare className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No recent chats
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Start a new conversation!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Collapsed Recent Chats */}
            {!extended && (
              <div className="space-y-2">
                {prevPrompts.slice(0, 8).map((item, index) => (
                  <button
                    key={index}
                    onClick={() => loadPrompt(item)}
                    className="w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center"
                    title={item.slice(0, 50)}
                  >
                    <FiMessageSquare className="w-4 h-4 text-gray-400 hover:text-gemini-500" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full p-3 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-3 group"
            >
              <div className="text-gray-400 group-hover:text-gemini-500 transition-colors">
                {item.icon}
              </div>
              {extended && (
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {item.label}
                </span>
              )}
            </button>
          ))}

          {/* Theme Toggle in Sidebar */}
          <button
            onClick={toggleDarkMode}
            className="w-full p-3 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center space-x-3 group"
          >
            <div className="text-gray-400 group-hover:text-gemini-500 transition-colors">
              {darkMode ? (
                <FiSun className="w-5 h-5" />
              ) : (
                <FiMoon className="w-5 h-5" />
              )}
            </div>
            {extended && (
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {darkMode ? "Light Mode" : "Dark Mode"}
              </span>
            )}
          </button>
        </div>

        {/* Storage Info */}
        {extended && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Storage</span>
              <span>{prevPrompts.length}/20 chats</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-2">
              <div
                className="bg-gemini-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(prevPrompts.length / 20) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
