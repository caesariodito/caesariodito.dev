import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";

// TODO add spotlight effect "https://codepen.io/sebastian-piskaty/pen/xxaZYOL"
// TODO migrate react-grid-gallery to "https://react-photo-album.com/"

import "./styles/style.css";

function App() {
  return (
    <div className="bg">
      <div className="app center">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
