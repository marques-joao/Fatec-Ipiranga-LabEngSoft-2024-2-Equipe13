// AccessibilityContext.js
import React, { createContext, useState, useContext } from 'react';

const AcessibilidadeContexto = createContext();

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Tamanho padrão
  const [isBold, setIsBold] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        isBold,
        setIsBold,
        isHighContrast,
        setIsHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

// Hook para usar o contexto facilmente
export const useAccessibility = () => useContext(AcessibilidadeContexto);
