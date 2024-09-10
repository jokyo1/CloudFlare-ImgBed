// functions/upload.js
export async function onRequest(context) {
    const { request } = context;
    const url = 'https://demo-cloudflare-imgbed.pages.dev/upload?authCode=unset';

    // 转发请求
    const response = await fetch(url, {
        method: 'POST',
        headers: request.headers,
        body: request.body,
    });

    // 返回响应
    return new Response(response.body, {
        status: response.status,
        headers: response.headers,
    });
}
