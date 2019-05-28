import { useContext, createContext } from 'react';
import { Size } from './types';

export const Context = createContext({
  bear: 0,
  bull: 0,
  price: 0,
  base: 0,
  minValue: 0,
  maxValue: 0,
  width: 0,
  size: 's',
} as {
  bear: number,
  bull: number,
  price: number,
  base: number,
  minValue: number,
  maxValue: number,
  width: number,
  size: Size,
});

export const useValues = () => {
  const context = useContext(Context);
  return context;
};

export const usePriceToX = (price: number) => {
  const { minValue, maxValue, width } = useValues();
  const delta = maxValue - minValue;
  const noOffset = price - minValue;
  const scale = noOffset / delta;
  return width * scale;
};
