import { Inter } from 'next/font/google';
import Link from 'next/link';
import ViewStores from './ViewStores';
import { SearchBar } from './SearchBar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className="mx-auto px-4 flex flex-col h-[100dvh]">
      <header className="bg-theme-gradient pb-8 pt-2 mt-8">
        <h1 className="text-5xl text-center">Coupons</h1>
      </header>
      <section className="flex justify-between bg-theme-medium px-4 py-4 items-center">
        <SearchBar />
      </section>
      <section>
        <ViewStores />
      </section>
      <section className="mt-auto">
        <Link
          href={'/stores'}
          className="px-8 py-4 text-lg block max-w-fit mx-auto bg-theme-medium rounded-md mt-6 mb-12">
          Shop hinzufügen
        </Link>
      </section>
    </main>
  );
}
