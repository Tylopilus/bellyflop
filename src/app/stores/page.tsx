import Link from 'next/link';
import SaveButton from './SaveButton';

export default function Stores() {
  return (
    <main className="mx-auto px-4">
      <header className="bg-theme-gradient pb-8 pt-2 mt-8">
        <div className="grid grid-rows-1 grid-cols-1 items-center">
          <Link href={'/'} className="text-2xl row-start-1 col-start-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>
          </Link>
          <h1 className="text-2xl text-center row-start-1 col-start-1 pointer-events-none">
            Shop hinzufügen
          </h1>
        </div>
      </header>
      <section>
        <label className="block mt-6">
          <span className="text-lg ml-2">Name</span>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </label>
        <label className="block mt-6">
          <span className="text-lg ml-2">Website</span>
          <input
            type="text"
            name="website"
            placeholder="Website"
            className="bg-theme-medium py-4 px-2 rounded-sm w-full text-2xl placholder-[#5A5A5A] text-white focus:outline-none focus-within:ring-2 focus-within:ring-theme-light focus-within:ring-opacity-50"
          />
        </label>
      </section>
      <section>
        <SaveButton />
      </section>
    </main>
  );
}
