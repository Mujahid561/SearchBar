import { computeHeadingLevel } from "@testing-library/react";
import React, { useState, useEffect, useRef } from "react";

function App() {
  const data = [
    { title: "apple", id: 1 },
    { title: "mango", id: 2 },
    { title: "orange", id: 3 },
    { title: "banana", id: 4 },
    { title: "grapes", id: 5 },
    { title: "kiwi", id: 6 },
    { title: "strawberry", id: 7 },
    { title: "muskmelon", id: 8 },
    { title: "watermelon", id: 9 },
    { title: "app", id: 10 },
  ];

  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // Track highlighted suggestion

  const handleSuggestions = () => {
    let filteredData = data.filter((elem) => {
      return elem.title.toLowerCase().includes(text.toLowerCase());
    });
    if (filteredData.length > 0) {
      setSuggestions(filteredData);
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (text !== "") {
      handleSuggestions();
    } else {
      setShowModal(false);
      setSuggestions([]);
    }
  }, [text]);

  const handleAutoComplete = (e, title) => {
    e.preventDefault();
    e.stopPropagation();
    setText(title + " ");
    
    handleOnBlur()
    
    
    setHighlightedIndex(-1);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 400);
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestions.length ? prevIndex + 1 : prevIndex
      );
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
      e.preventDefault();
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        handleAutoComplete(e, suggestions[highlightedIndex].title);
        setHighlightedIndex(-1);
        handleOnBlur();
      }
      e.preventDefault();
    }
  };

  useEffect(() => {
    setHighlightedIndex(-1);
  }, [suggestions]);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div style={{ width: "30%", display: "flex", flexDirection: "column" }}>
        <input
          style={{ padding: "8px", position: "relative" }}
          placeholder="Enter here..."
          onChange={handleText}
          onBlur={handleOnBlur}
          onKeyDown={handleKeyDown}
          value={text}
        ></input>
        {showModal && (
          <div>
            <ul
              style={{
                paddingLeft: "1px",
                margin: 0,
                padding: 0,
                maxHeight: "300px",
                overflowY: "scroll",
              }}
              role="listbox"
            >
              {suggestions.map((elem, index) => (
                <li
                  style={{
                    border: "1px solid gray",
                    padding: "8px",
                    cursor: "pointer",
                    backgroundColor:
                      highlightedIndex === index ? "#ddd" : "white",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                  key={elem.id}
                  onClick={ (e)=>handleAutoComplete(e, suggestions[highlightedIndex].title)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div>{elem?.title}</div>
                  <div>{"↖"}</div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
