"use client";

import React, { useEffect, useState } from "react";
import "./AccContainer.scss";
import Accordian from "../Accordian/Accordian";

const AccContainer = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("/api/faqs")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Failed to fetch FAQs:", err));
  }, []);

  return (
    <div className="accContainer">
      <h2>Explore options near me</h2>
      {questions.length === 0 && <p>Loading...</p>}
      {questions.map((question) => (
        <Accordian question={question} key={question.id} />
      ))}
    </div>
  );
};

export default AccContainer;
