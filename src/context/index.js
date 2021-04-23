import React, { createContext } from 'react'

const themes = {
    covid: {
        background: "#5b8a72",
        isCovid: true
    },
    normal: {
        background: "rgba(24,27,29)",
        isCovid: false
    }
  };

const ThemeContext = createContext(themes.normal);

export default ThemeContext