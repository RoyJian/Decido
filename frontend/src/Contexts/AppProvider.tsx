import React, { useState, createContext } from 'react';
import { Meal } from './Interface';
import { initMealsArr } from './InitValue';

export interface appContextValueInterface {
  theSelctStyle: string;
  setTheSelctStyle: (state: string) => void;
  mealsArr: Meal[];
  setMealsArr: (state: Meal[]) => void;
}
interface Props {
  children: JSX.Element;
}

export const AppContext = createContext<appContextValueInterface | null>(null);

export default function Context(props: Props) {
  const [theSelctStyle, setTheSelctStyle] = useState('');
  const [mealsArr, setMealsArr] = useState<Meal[]>(initMealsArr);
  const appContextValue: appContextValueInterface = {
    theSelctStyle,
    setTheSelctStyle,
    mealsArr,
    setMealsArr,
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
}
