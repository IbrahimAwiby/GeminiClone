import { createContext, useState, useEffect } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false); // Fixed: removed nested useState
  const [resultData, setResultData] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    // Dark mode
    const savedDarkMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const isDark = savedDarkMode
      ? JSON.parse(savedDarkMode)
      : systemPrefersDark;

    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);

    // Chat history
    const savedChats = localStorage.getItem("geminiChatHistory");
    if (savedChats) {
      setPrevPrompts(JSON.parse(savedChats));
    }

    // Sidebar state (default to closed on mobile, open on desktop)
    const isMobile = window.innerWidth < 768;
    setSidebarOpen(!isMobile);
  }, []);

  // Save chats to localStorage whenever prevPrompts changes
  useEffect(() => {
    localStorage.setItem("geminiChatHistory", JSON.stringify(prevPrompts));
  }, [prevPrompts]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
    setResultData("");
    setRecentPrompt("");
    closeSidebar();
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let result;
    const currentPrompt = prompt !== undefined ? prompt : input;

    if (currentPrompt) {
      // Add to chat history (avoid duplicates)
      const updatedPrompts = [
        currentPrompt,
        ...prevPrompts.filter((p) => p !== currentPrompt),
      ].slice(0, 20);
      setPrevPrompts(updatedPrompts);
      setRecentPrompt(currentPrompt);

      try {
        result = await run(currentPrompt);
      } catch (error) {
        result = "Sorry, I encountered an error. Please try again.";
      }
    } else {
      setLoading(false);
      return;
    }

    // Format response with markdown-like styling
    let formattedResponse = result
      .split("**")
      .map((part, index) =>
        index % 2 === 1
          ? `<strong class="text-gemini-600 dark:text-gemini-400">${part}</strong>`
          : part
      )
      .join("")
      .split("*")
      .join("<br/>")
      .split("###")
      .map((part, index) =>
        index % 2 === 1
          ? `<h3 class="text-lg font-semibold mt-4 mb-2 text-gemini-600 dark:text-gemini-400">${part}</h3>`
          : part
      )
      .join("")
      .split("\n")
      .map((line) => (line.trim() ? line : "<br/>"))
      .join("");

    setResultData(formattedResponse);
    setLoading(false);
    setInput("");
    closeSidebar();
  };

  const clearChatHistory = () => {
    setPrevPrompts([]);
    localStorage.removeItem("geminiChatHistory");
    newChat();
  };

  const deleteChat = (promptToDelete) => {
    const updatedPrompts = prevPrompts.filter(
      (prompt) => prompt !== promptToDelete
    );
    setPrevPrompts(updatedPrompts);
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    onSent,
    newChat,
    darkMode,
    toggleDarkMode,
    sidebarOpen,
    toggleSidebar,
    closeSidebar,
    clearChatHistory,
    deleteChat,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
