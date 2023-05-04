'use client';

import { useLocalStorage } from '@/store';
import { useRouter } from 'next/navigation';
import { MouseEvent as ReactMouseEvent, useState } from 'react';

export default function SaveButton() {
  const router = useRouter();
  const [isPending, setPending] = useState(false);
  const updateStores = useLocalStorage((state) => state.setStore);
  const stores = useLocalStorage((state) => state.stores);

  const storeData = async () => {
    const name = (
      document.querySelector('input[name="name"]') as HTMLInputElement
    ).value;
    const website = (
      document.querySelector('input[name="website"]') as HTMLInputElement
    ).value;
    const iconUrl = await fetch('/api/icon?url=' + website).then((res) =>
      res.text()
    );

    console.log(stores, name, website, iconUrl);
    await updateStores({
      name,
      website,
      iconUrl,
      coupons: [
        {
          id: '1',
          discountValue: '10%',
          type: 'Drogerieprodukte',
          code: 'abc',
          expiresAt: '2021-12-31',
          description: 'tolle Wurst',
        },
      ],
    });
  };
  const clickHandler = async (
    e: ReactMouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setPending(true);
    try {
      await storeData();
      router.push('/');
    } catch (e) {
      console.error(e);
      setPending(false);
    }
  };

  return (
    <button
      className="px-8 py-4 text-lg block max-w-fit mx-auto bg-theme-medium rounded-md mt-6 mb-12"
      onClick={clickHandler}>
      Speichern {isPending && '...'}
    </button>
  );
}
