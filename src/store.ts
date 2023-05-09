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
  search: string;
  filterdStores: Store[];
  setStore: (value: Store) => void;
  deleteStore: (value: Store) => void;
  deleteCoupon: (coupon: Coupon, store: Store) => void;
  addCoupon: (coupon: Coupon, store: Store) => void;
  setFilter: (searchString: string) => void;
  setSearch: (searchString: string) => void;
};

const useLocalStorage = create<ZustandState>()(
  persist(
    (set, get) => ({
      stores: [],
      search: '',
      filterdStores: [],
      setStore: (value) => {
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
          state.stores = state.stores.map((s) => {
            if (s.name === store.name) {
              s.coupons = s.coupons.filter((c) => c.id !== coupon.id);
            }
            return s;
          });
          return { ...state };
        });
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
      setFilter(searchStr = '') {
        set(({ filterdStores }) => {
          filterdStores = get().stores;
          if (searchStr === '') {
            return { ...get(), filterdStores };
          }

          const filters = filterdStores.map((store) => {
            const coups = store.coupons.filter((coupon) => {
              return (
                coupon.type.includes(searchStr) ||
                coupon.code.includes(searchStr) ||
                coupon.description.includes(searchStr) ||
                coupon.discountValue.includes(searchStr)
              );
            });
            return { ...store, coupons: coups };
          });

          const storeFilters = filterdStores.filter((store) => {
            return store.name.includes(searchStr);
          });

          filters.push(...storeFilters);
          return { ...get(), filterdStores: filters };
        });
      },
      setSearch(searchStr = '') {
        set(({ search }) => {
          return { ...get(), search: searchStr };
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
    useLocalStorage.getState().setFilter('');
  }, [result]);

  return data;
};
