'use client';

import { Coupon, Store, useLocalStorage } from '@/store';
import { useRouter } from 'next/navigation';
import { useId, useState } from 'react';

export default function AddCoupon({
  params: { store: storeParam },
}: {
  params: { store: string };
}) {
  const [isPending, setPending] = useState(false);
  const router = useRouter();
  const id = useId();
  const addCouponToStore = useLocalStorage((state) => state.addCoupon);
  const store = useLocalStorage((state) =>
    state.stores.find((store) => store.name === storeParam)
  );

  const addCoupon = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const inputElements = document.querySelectorAll('input');
    const data: Partial<Coupon> = {
      id,
    };
    for (const input of inputElements) {
      data[input.name] = input.value;
    }
    data.store = store;
    setPending(true);
    await addCouponToStore(data as Coupon);
    router.push('/');
    setPending(false);
  };

  return (
    <main className="mx-auto px-4">
      <header className="bg-theme-gradient pb-8 pt-2 mt-8">
        <h1 className="text-2xl text-center">
          Coupon zu {storeParam} hinzufügen
        </h1>
      </header>
      <section className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="abc"
            autoComplete="off"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="discountValue">Rabatt</label>
          <input
            type="text"
            name="discountValue"
            id="discountValue"
            placeholder="10%"
            autoComplete="off"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="type">Kategorie</label>
          <input
            type="text"
            name="type"
            id="type"
            placeholder="Drogerieprodukte"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="expiresAt">Gültig bis</label>
          <input
            type="date"
            name="expiresAt"
            id="expiresAt"
            placeholder="2021-12-31"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Beschreibung</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="tolle Wurst"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </div>
      </section>
      <section>
        <button
          className="px-8 py-4 text-lg block max-w-fit mx-auto bg-theme-medium rounded-md mt-6 mb-12"
          onClick={addCoupon}>
          Speichern {isPending && '...'}
        </button>
      </section>
    </main>
  );
}
