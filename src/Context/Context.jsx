import { createContext, useState } from "react";
import run from "../Config/Gemini";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(useState(false));
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let result;
    if (prompt !== undefined) {
      result = await run(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      result = await run(input);
    }
    let responseArray = result.split("**");
    let newArray = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 === 0) {
        // Even indices (including 0) remain normal
        newArray += responseArray[i];
      } else {
        // Odd indices are bold
        newArray += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newArray2 = newArray.split("*").join("<br/>");
    let newResponseAeeay = newArray2.split(" ");
    for (let i = 0; i < newResponseAeeay.length; i++) {
      delayPara(i, newResponseAeeay[i] + " ");
    }
    setLoading(false);
    setInput("");
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
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default ContextProvider;
