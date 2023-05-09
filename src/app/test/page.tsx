import LoadLocalStorage from './loadLocalStorage';
export default function Page({ searchParams }: { searchParams: string }) {
  const data = new URLSearchParams(searchParams).get('data') || '';
  const params = Buffer.from(data, 'base64').toString('utf-8') || '{}';
  console.log({ params });
  const json = JSON.parse(params);
  console.log(params);
  return (
    <>
      <div>Test Page</div>
      <div>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
      <LoadLocalStorage />
    </>
  );
}
