import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Coupon = {
  id: string;
  discountValue: string;
  description: string;
  expiresAt: string;
  code: string;
  type: string;
  store: Store;
};

export type Store = {
  name: string;
  website: string;
  iconUrl: string;
};

type ZustandState = {
  stores: Store[];
  coupons: Coupon[];
  addStore: (value: Store) => void;
  deleteStore: (value: Store) => void;
  deleteCoupon: (coupon: Coupon, store: Store) => void;
  addCoupon: (coupon: Coupon) => void;
  getCoupons: (store: Store) => Coupon[];
};

const useLocalStorage = create<ZustandState>()(
  persist(
    (set, get) => ({
      stores: [],
      coupons: [],
      addStore: (value) => {
        set((state) => {
          state.stores = [...state.stores, value];
          // state.stores.push(value);
          return { ...state };
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
          return { ...state };
        });
      },
      addCoupon: (coupon) => {
        set((state) => {
          const localCoupon = [...state.coupons, coupon];
          return { ...state, coupons: localCoupon };
        });
      },
      getCoupons: (store) => {
        return get().coupons.filter(
          (coupon) => coupon.store.name === store.name
        );
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
    // useLocalStorage.getState().setFilter('');
  }, [result]);

  return data;
};
