import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Coupon = {
  id: string;
  discountValue: string;
  description: string;
  expiresAt: string;
  code: string;
  type: string;
};

export type Store = {
  name: string;
  website: string;
  coupons: Coupon[];
  iconUrl: string;
};

type ZustandState = {
  stores: Store[];
  setStore: (value: Store) => void;
  deleteStore: (value: Store) => void;
  deleteCoupon: (coupon: Coupon, store: Store) => void;
  getStore: (store: Store) => Store | undefined;
  addCoupon: (coupon: Coupon, store: Store) => void;
};

const useLocalStorage = create<ZustandState>()(
  persist(
    (set, get) => ({
      stores: [],
      setStore: (value) => {
        set((state) => {
          state.stores.push(value);
          return state;
        });
      },
      deleteStore: (value) => {
        set((state) => {
          state.stores = state.stores.filter(
            (store) => store.name !== value.name
          );
          return { ...state };
        });
      },
      deleteCoupon: (coupon, store) => {
        set((state) => {
          state.stores = state.stores.map((s) => {
            if (s.name === store.name) {
              s.coupons = s.coupons.filter((c) => c.id !== coupon.id);
            }
            return s;
          });
          return { ...state };
        });
      },
      getStore: (store) => {
        return get().stores.find((s) => s.name === store.name);
      },
      addCoupon: (coupon, store) => {
        set((state) => {
          state.stores = state.stores.map((s) => {
            if (s.name === store.name) {
              s.coupons.push(coupon);
            }
            return s;
          });
          return { ...state };
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

  return data;
};
