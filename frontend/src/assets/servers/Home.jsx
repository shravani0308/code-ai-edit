import React from 'react'
import Prism from "prismjs";
import { useState, useEffect } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import ReactMarkdown from "react-markdown";

import "prismjs/themes/prism-tomorrow.css";

const Home = () => {
    function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);

  const [review, setReview] = useState("");

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const response = await axios.post(
        "http://localhost:3000/ai/get-response",
        { code }
      );

      setReview(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) =>
              Prism.highlight(code, Prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "5px",
              border: "1px solid #ddd",
              backgroundColor: "#000",
              fontSize: 14,
              fontFamily: '"Fira Code", monospace',
            }}
          />
        </div>

        <button className="review" onClick={reviewCode}>
          Review
        </button>
      </div>

      <div className="right">
        <ReactMarkdown>{review}</ReactMarkdown>
      </div>
    </main>
  );
}

  
}

export default Home;