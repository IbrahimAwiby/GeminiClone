import { useContext, useRef, useEffect } from "react";
import { Context } from "../../Context/Context";
import {
  FiUser,
  FiSend,
  FiImage,
  FiMic,
  FiSun,
  FiMoon,
  FiCompass,
  FiMessageSquare,
  FiCode,
  FiZap,
  FiTrendingUp,
  FiMenu,
} from "react-icons/fi";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    darkMode,
    toggleDarkMode,
    toggleSidebar,
  } = useContext(Context);

  const resultEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    resultEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [resultData, loading]);

  const suggestionCards = [
    {
      icon: <FiCompass className="w-6 h-6" />,
      title: "Explore ideas",
      desc: "Brainstorm creative concepts",
      prompt: "Help me brainstorm creative ideas for a new project about",
    },
    {
      icon: <FiTrendingUp className="w-6 h-6" />,
      title: "Get insights",
      desc: "Deep dive into topics",
      prompt: "Provide a comprehensive analysis of",
    },
    {
      icon: <FiMessageSquare className="w-6 h-6" />,
      title: "Chat freely",
      desc: "Have natural conversations",
      prompt: "Let's have a conversation about",
    },
    {
      icon: <FiCode className="w-6 h-6" />,
      title: "Code helper",
      desc: "Get programming assistance",
      prompt: "Help me with programming code for",
    },
  ];

  const handleSuggestionClick = (prompt) => {
    setInput(prompt);
    // Focus on input after setting the value
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
      {/* Navigation */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-900 z-20">
        <div className="flex items-center space-x-2">
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>

          <FiZap className="w-6 h-6 text-gemini-500 hidden md:block" />
          <span className="text-xl font-bold bg-gradient-to-r from-gemini-500 to-purple-600 bg-clip-text text-transparent">
            Gemini Awiby
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
          <div className="w-8 h-8 bg-gradient-to-r from-gemini-500 to-purple-500 rounded-full flex items-center justify-center">
            <FiUser className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 md:p-6">
          {!showResult ? (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="text-center space-y-4 mt-4 md:mt-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Hello, <span className="text-gemini-500">Hema</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
                  How can I help you today?
                </p>
              </div>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-8 md:mt-12">
                {suggestionCards.map((card, index) => (
                  <div
                    key={index}
                    className="group p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-gemini-300 dark:hover:border-gemini-600 transition-all duration-300 hover:shadow-lg cursor-pointer"
                    onClick={() => handleSuggestionClick(card.prompt)}
                  >
                    <div className="flex items-center space-x-3 md:space-x-4">
                      <div className="p-2 md:p-3 bg-gemini-50 dark:bg-gemini-900 rounded-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="text-gemini-500">{card.icon}</div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                          {card.title}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6 py-4">
              {/* User Prompt */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiUser className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 dark:text-white font-medium text-sm md:text-base">
                    {recentPrompt}
                  </p>
                </div>
              </div>

              {/* AI Response */}
              <div className="flex items-start space-x-3 md:space-x-4">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-gemini-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <FiZap className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <div className="flex-1 min-h-20">
                  {loading ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="h-3 md:h-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"
                          style={{ width: `${70 - i * 10}%` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div
                      className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: resultData }}
                    />
                  )}
                  <div ref={resultEndRef} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-gemini-500 dark:focus-within:border-gemini-400 transition-colors duration-200">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && input && onSent()}
              placeholder="Message Gemini Awiby..."
              className="flex-1 bg-transparent border-0 focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 py-3 md:py-4 px-4 md:px-6 rounded-2xl text-sm md:text-base"
            />

            <div className="flex items-center space-x-1 md:space-x-2 pr-3 md:pr-4">
              <button
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gemini-500 dark:hover:text-gemini-400 transition-colors"
                aria-label="Upload image"
              >
                <FiImage className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              <button
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-gemini-500 dark:hover:text-gemini-400 transition-colors"
                aria-label="Voice input"
              >
                <FiMic className="w-4 h-4 md:w-5 md:h-5" />
              </button>
              {input && (
                <button
                  onClick={() => onSent()}
                  className="p-2 bg-gemini-500 hover:bg-gemini-600 text-white rounded-lg transition-colors duration-200"
                  aria-label="Send message"
                >
                  <FiSend className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
            </div>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3 md:mt-4">
            &copy; {new Date().getFullYear()} Gemini Awiby. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
