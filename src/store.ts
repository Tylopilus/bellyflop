import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useLocalStorage = create(
  persist(
    (set) => ({
      stores: [],
      setStore: (key: string, value: any) => {
        set((state: any) => ({
          stores: {
            ...state.stores,
            [key]: value,
          },
        }));
      },
    }),
    {
      name: 'shopStorage',
    }
  )
);
export { useLocalStorage };
