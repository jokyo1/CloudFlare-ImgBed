// functions/upload.js
export async function onRequest(context) {
    const { request } = context;
    //const url = 'https://demo-cloudflare-imgbed.pages.dev/upload?authCode=cfbed';
 // 腾讯的上传URL
    const uploadUrl = "https://openai.weixin.qq.com/weixinh5/webapp/h774yvzC2xlB4bIgGfX2stc4kvC85J/cos/upload";

    if (request.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400', // 24小时
      },
    });
  }

  try {
    // 转发请求
    const response = await fetch(uploadUrl , {
        method: 'POST',
        headers: request.headers,
        body: request.body,
    });

   // 假设 response 是你获取的原响应对象
    const jsonResponse = await response.json();
    const resurl = jsonResponse.url;
      const data = {
      "url": resurl,
      "code": 200,
      "name": jsonResponse.filekey
    }

   const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Max-Age': '86400', // 24 hours
    };
    // 返回响应
    return new Response(data, {
        status: response.status,
        headers: {
            ...corsHeaders,
            ...response.headers,
        },
    });
    } catch (error) {
    return Response({
      status: 500,
      success: false
        }
        
      , {
        status: 500,
        headers: corsHeaders,
      })
    }
}
