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
