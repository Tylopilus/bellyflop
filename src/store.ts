import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Store = {
  name: string;
  website: string;
  coupons: any[];
  iconUrl: string;
};

type ZustandState = {
  stores: Store[];
  setStore: (value: Store) => void;
};

const useLocalStorage = create<ZustandState>()(
  persist(
    (set) => ({
      stores: [],
      setStore: (value) => {
        set((state) => {
          state.stores.push(value);
          return state;
        });
      },
    }),
    {
      name: 'shopStorage',
    }
  )
);
export { useLocalStorage };

import { useEffect, useState } from 'react';

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F;
  const [data, setData] = useState<F>();

  useEffect(() => {
    setData(result);
  }, [result]);

  return data || [];
};
