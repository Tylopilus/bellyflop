/* eslint-disable @next/next/no-img-element */
'use client';
import { Coupon, Store, useLocalStorage, useStore } from '@/store';
import Link from 'next/link';
import { useState } from 'react';

export default function ViewStores() {
  // const stores = useStore(useLocalStorage, (state) => state.stores) || [];
  const stores = useStore(useLocalStorage, (state) => state.stores) || [];
  return (
    <div className="mt-8 grid gap-12">
      {stores.map((store) => (
        <div key={store.name}>
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <img
                alt={store.name}
                src={store.iconUrl}
                width={24}
                height={24}
                className="rounded-full w-8 aspect-square"
              />
              <h2 className="text-2xl">{store.name}</h2>
            </div>
            <div>
              <Link href={`/stores/${store.name}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4V20M20 12H4"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <Coupons store={store} />
        </div>
      ))}
    </div>
  );
}

export function Coupons({ store }: { store: Store }) {
  const coupons = useLocalStorage((state) => state.getCoupons(store));
  return (
    <div className="flex flex-col gap-1 mt-2">
      {coupons.map((coupon) => (
        <Coupon key={coupon.code} coupon={coupon} />
      ))}
    </div>
  );
}

export function Coupon({ coupon}: { coupon: Coupon}) {
  const deleteCoupon = useLocalStorage((state) => state.deleteCoupon);
  const [show, setShow] = useState(false);
  return (
    <div
      className="rounded-md text-white text-xl bg-theme-medium/30 w-full"
      key={coupon.id}>
      <div
        className="flex justify-between items-center bg-theme-medium w-full py-2 px-4 rounded-md"
        onClick={() => setShow(!show)}>
        <div className="flex gap-4">
          <span>{coupon.discountValue}</span>
          <span>{coupon.type}</span>
        </div>
        <div>
          <span>{new Date(coupon.expiresAt).toLocaleDateString()}</span>
        </div>
      </div>
      <div
        className="text-center grid transition-[grid-template-rows] duration-300 ease-in-out"
        style={{ gridTemplateRows: show ? '1fr' : '0fr' }}>
        <div className="overflow-hidden">
          <div className="px-4 py-2">{coupon.description}</div>
          <button
            className="bg-alert text-white rounded-md max-w-fit px-4 py-2 my-4"
            onClick={() => {
              deleteCoupon(coupon);
            }}>
            Loeschen
          </button>
        </div>
      </div>
    </div>
  );
}
