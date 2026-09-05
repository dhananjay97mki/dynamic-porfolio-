"use client";

import { useEffect } from "react";

export default function PortfolioCursor() {
  useEffect(() => {
    document.body.classList.add("portfolio-cursor");

    return () => {
      document.body.classList.remove("portfolio-cursor");
    };
  }, []);

  return null;
}