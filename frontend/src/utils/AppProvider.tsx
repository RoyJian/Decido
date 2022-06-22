import React, { useState, createContext } from 'react';

export interface appContextValueInterface {
  theSelctStyle: string;
  setTheSelctStyle: React.Dispatch<React.SetStateAction<string>>;
}
interface Props {
  children: JSX.Element;
}

export const AppContext  = createContext<appContextValueInterface | null >(null);

export default function Context(props:Props) {
  const [theSelctStyle, setTheSelctStyle] = useState('');
  const appContextValue: appContextValueInterface = {
    theSelctStyle,
    setTheSelctStyle,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
}
