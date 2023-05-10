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
  backupCoupons: Coupon[];
  addStore: (value: Store) => void;
  deleteStore: (value: Store) => void;
  deleteCoupon: (coupon: Coupon) => void;
  addCoupon: (coupon: Coupon) => void;
  getCoupons: (store: Store) => Coupon[];
  setFilter: (searchString: string) => void;
};

const useLocalStorage = create<ZustandState>()(
  persist(
    (set, get) => ({
      stores: [],
      coupons: [],
      backupCoupons: [],
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
      deleteCoupon: (coupon) => {
        set((state) => {
          const coupons = state.coupons.filter((c) => c.id !== coupon.id);
          return { ...state, coupons, backupCoupons: coupons };
        });
      },
      addCoupon: (coupon) => {
        set((state) => {
          const localCoupon = [...state.coupons, coupon];
          return { ...state, coupons: localCoupon, backupCoupons: localCoupon };
        });
      },
      getCoupons: (store) => {
        return get().coupons.filter(
          (coupon) => coupon.store.name === store.name
        );
      },
      setFilter(searchStr): void {
        set((state): ZustandState => {
          if (searchStr === '') {
            return { ...state, coupons: [...state.backupCoupons] };
          }

          const coupons = state.backupCoupons.filter((coupon) => {
            return (
              coupon.store.name.toLowerCase().includes(searchStr) ||
              coupon.description.toLowerCase().includes(searchStr) ||
              coupon.code.toLowerCase().includes(searchStr) ||
              coupon.type.toLowerCase().includes(searchStr) ||
              coupon.discountValue.toLowerCase().includes(searchStr) ||
              coupon.expiresAt.toLowerCase().includes(searchStr)
            );
          });
          return { ...state, coupons: [...coupons] };
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
    // useLocalStorage.getState().setFilter('');
  }, [result]);

  return data;
};
