import "./App.css";
import React, { useState } from "react";

const App = () => {
  const url = "https://api.quotable.io/random";

  const initialQuoteData = {
    content: "Let time be your only competitor.",
    author: "Ahmed Saber",
  };

  const [quote, setQuote] = useState(initialQuoteData);

  const generateQuote = () => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setQuote(data);
      })
      .catch((error) => {
        console.error("Error fetching quote:", error);
        alert("Failed to fetch a new quote. Please try again later.");
      });
  };
  const shareQuote = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Quote",
          text: `${quote.author} once said: "${quote.content}"`,
        })
        .then(() => console.log("Quote shared successfully"))
        .catch((error) => console.error("Error sharing quote:", error));
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(
      `${quote.author} once said: "${quote.content}"`
    );
    alert("Copied to clipboard!");
  };

  return (
    <>
      <h1>Quote Generator React App</h1>
      <div className="container">
        <p>{quote.content}</p>
        <span>{quote.author}</span>
        <div className="btns">
          <button onClick={copy} className="btn">
            Copy
          </button>
          <button onClick={shareQuote} className="btn">
            Share
          </button>
          <button onClick={generateQuote} className="btn">
            Generate Another Quote
          </button>
          
        </div>
      </div>
    </>
  );
};

export default App;
