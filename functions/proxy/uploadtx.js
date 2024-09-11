// functions/upload.js
export async function onRequest(context) {
    const { request } = context;
    //const url = 'https://demo-cloudflare-imgbed.pages.dev/upload?authCode=cfbed';
 // 腾讯的上传URL
    const uploadUrl = "https://openai.weixin.qq.com/weixinh5/webapp/h774yvzC2xlB4bIgGfX2stc4kvC85J/cos/upload";


    // 转发请求
    const response = await fetch(uploadUrl , {
        method: 'POST',
        headers: request.headers,
        body: request.body,
    });

   // 假设 response 是你获取的原响应对象
    const jsonResponse = await response.json();
    const url = jsonResponse.url;

    // 返回响应
    return new Response(url, {
        status: response.status,
        headers: response.headers,
    });

}
