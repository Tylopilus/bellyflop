import Link from 'next/link';
import SaveButton from './SaveButton';

export default function Stores() {
  return (
    <main className="mx-auto px-4">
      <header className="bg-theme-gradient pb-8 pt-2 mt-8">
        <h1 className="text-2xl text-center">Shop hinzufügen</h1>
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
