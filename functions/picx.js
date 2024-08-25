export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const fullPath = url.searchParams.get('fullPath');
  //const name = url.searchParams.get('name');

  if (!fullPath) {
    return new Response('Missing parameters', { status: 400 });
  }

  const imageUrl = `https://github.com/${fullPath}`;

  //console.log(`Fetching image from URL: ${imageUrl}`);
  //console.log(`Full Path: ${fullPath}`);
  //console.log(`Name: ${name}`);

  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      //console.error(`Failed to fetch image: ${response.statusText}`);
      return new Response('Failed to fetch image', { status: 500 });
    }

    return new Response(response.body, {
      headers: {
        'Content-Type': response.headers.get('Content-Type'),
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    //console.error(`Error fetching image: ${error.message}`);
    return new Response('Error fetching image', { status: 500 });
  }
}
