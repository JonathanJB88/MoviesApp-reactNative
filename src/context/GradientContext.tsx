import React, { createContext, useState } from 'react';

interface ImgColors {
  primary: string;
  secondary: string;
}

interface ContextProps {
  colors: ImgColors;
  prevColors: ImgColors;
  setMainColors: (colors: ImgColors) => void;
  setPrevMainColors: (colors: ImgColors) => void;
}

export const GradientContext = createContext({} as ContextProps);

export const GradientProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [colors, setColors] = useState<ImgColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const [prevColors, setPrevColors] = useState<ImgColors>({
    primary: 'transparent',
    secondary: 'transparent',
  });

  const setMainColors = (colors: ImgColors) => {
    setColors(colors);
  };

  const setPrevMainColors = (colors: ImgColors) => {
    setPrevColors(colors);
  };

  return (
    <GradientContext.Provider
      value={{
        colors,
        prevColors,
        setMainColors,
        setPrevMainColors,
      }}>
      {children}
    </GradientContext.Provider>
  );
};
