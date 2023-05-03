export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const url = searchParams.get('url') || 'github.com';
  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${url}`;

  const res = await fetch(faviconUrl).then((res) => res.url);

  return new Response(`${res}`);
}
