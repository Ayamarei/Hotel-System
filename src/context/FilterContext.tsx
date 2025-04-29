import { createContext, useState, ReactNode } from 'react';

interface FiltersContextType {
  startDate: string;
  endDate: string;
  capacity: number;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  setCapacity: (capacity: number) => void;
}

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [capacity, setCapacity] = useState<number>(0);

  return (
    <FiltersContext.Provider value={{ startDate, endDate, capacity, setStartDate, setEndDate, setCapacity }}>
      {children}
    </FiltersContext.Provider>
  );
};


  