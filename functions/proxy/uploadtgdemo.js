// functions/upload.js
export async function onRequest(context) {
    const { request } = context;
    const url = 'https://demo-cloudflare-imgbed.pages.dev/upload?authCode=cfbed';

    // 转发请求
    const response = await fetch(url, {
        method: 'POST',
        headers: request.headers,
        body: request.body,
    });

    const rootUrl = `https://demo-cloudflare-imgbed.pages.dev`;

    // 假设 response 是你获取的原响应对象
    const jsonResponse = await response.json();
    const url = rootUrl + jsonResponse.data[0].src;

    // 返回响应
    return new Response(url, {
        status: response.status,
        headers: response.headers,
    });

}
