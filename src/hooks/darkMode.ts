import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = (isDarkMode: boolean) => {
    setIsDarkMode(isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
