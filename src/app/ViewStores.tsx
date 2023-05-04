'use client';
import { useLocalStorage } from '@/store';
import { useMemo } from 'react';

export default function ViewStores() {
  const stores = useLocalStorage((state) => state.stores);
  //
  const renderStore = useMemo(() => {}, [stores]);
  console.log(stores);
  return <h1>haik</h1>;
}
