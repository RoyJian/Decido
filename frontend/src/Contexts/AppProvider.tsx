import React, { useState, createContext } from 'react';
import { Meal ,Location} from './Interface';
import { initMealsArr } from './InitValue';

export interface appContextValueInterface {
  theSelctStyle: string;
  setTheSelctStyle: (state: string) => void;
  mealsArr: Meal[];
  setMealsArr: (state: Meal[]) => void;
  yourLocation:Location;
  setYourLocation:(state:Location)=>void;
  activeStep:number;
  setActiveStep:(state:number)=>void;
}
interface Props {
  children: JSX.Element;
}

export const AppContext = createContext<appContextValueInterface | null>(null);

export default function Context(props: Props) {
  const [theSelctStyle, setTheSelctStyle] = useState('');
  const [mealsArr, setMealsArr] = useState<Meal[]>(initMealsArr);
  const [yourLocation,setYourLocation]=useState<Location>({lat:0,lng:0});
  const [activeStep, setActiveStep] = React.useState(0);
  const appContextValue: appContextValueInterface = {
    theSelctStyle,
    setTheSelctStyle,
    mealsArr,
    setMealsArr,
    yourLocation,
    setYourLocation,
    activeStep,
    setActiveStep
  };
  return (
    <AppContext.Provider value={appContextValue}>
      {props.children}
    </AppContext.Provider>
  );
}
