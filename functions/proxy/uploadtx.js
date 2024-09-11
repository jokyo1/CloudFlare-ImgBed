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

    // 假设 request.body 已经是一个 FormData 对象
    let formData = request.body;


// 遍历 FormData 中的所有文件
    for (const [key, value] of formData.entries()) {
     //   if (key === "file" && value instanceof File && isMedia(value)) {
          if (key === "file") {
    // 如果字段名是 "file" 且文件是图片或视频，修改字段名为 "media"
    // 先存储文件数据
    const fileData = value;
    
    // 删除旧的文件字段
    formData.delete(key);
    
    // 添加新的字段
    formData.append("media", fileData);
     }
    }
      
    // 转发请求
    const response = await fetch(uploadUrl , {
        method: 'POST',
        headers: request.headers,
        body: formData,
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
    return new Response(resurl, {
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

    // 函数用于检查文件类型是否为图片或视频
    function isMedia(file) {
      const mediaTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/avi'];
      return mediaTypes.includes(file.type);
    }
