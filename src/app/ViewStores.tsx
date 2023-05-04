'use client';
import { useLocalStorage, useStore } from '@/store';

export default function ViewStores() {
  const stores = useStore(useLocalStorage, (state) => state.stores);

  return (
    <div>
      {stores.map((store) => (
        <h1 key={store.name}>{store.name}</h1>
      ))}
    </div>
  );
}
