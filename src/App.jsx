import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Projects from "./components/Projects";

// vercel analytics
import { Analytics } from "@vercel/analytics/react";

import "./styles/style.css";

function App() {
  return (
    <>
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
      <Analytics />
    </>
  );
}

export default App;
