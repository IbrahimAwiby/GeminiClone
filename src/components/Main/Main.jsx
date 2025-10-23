import "./Main.css";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { Context } from "../../Context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
    response,
  } = useContext(Context);
  return (
    <div className="main">
      <div className="nav">
        <p>Gemini Awiby</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Hema.</span>
              </p>
              <p>How Can I help you today ?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Libero,
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Libero,
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Libero,
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Libero,
                </p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => {
                setInput(e.target.value);
              }}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            &copy; 5/2/2025 Gemini Awiby. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// AIzaSyBU_LerJiCldizg8zM6k5ol8OiQ4VGk3NU

export default Main;
