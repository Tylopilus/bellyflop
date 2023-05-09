'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function LoadLocalStorage() {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const data = localStorage.getItem('shopStorage');
    if (data) {
      const base64Data = Buffer.from(data).toString('base64');

      console.log('uncompressed', base64Data);
      router.push(
        path.concat('?data=').concat(Buffer.from(data).toString('base64'))
      );
    }
  }, []);

  return null;
}
