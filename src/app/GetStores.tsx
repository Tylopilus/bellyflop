'use client';
import { useLocalStorage } from '@/store';

export default function GetStores({ view }: { view: React.ReactNode }) {
  const stores = useLocalStorage((state: any) => state.stores);
  const storeList = Object.keys(stores).map((key) => stores[key]);

  console.log(storeList);
  return <>{view}</>;
}
