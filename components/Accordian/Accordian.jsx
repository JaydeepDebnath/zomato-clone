"use client";

import React, { useState } from "react";
import "./Accordian.scss";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const Accordian = ({ question }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordian">
      <div
        className="accordianContainer"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {/* Header */}
        <div className="accordianTitle">
          <h3>{question.title}</h3>
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </div>

        {/* Content */}
        {open && <p className="accordianContent">{question.infos}</p>}
      </div>
    </div>
  );
};

export default Accordian;
