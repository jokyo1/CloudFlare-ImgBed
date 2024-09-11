// functions/upload.js
export async function onRequest(context) {
    const { request } = context;
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

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Max-Age': '86400', // 24 hours
    };

    let formData;
            // 将请求体解析为 FormData 对象
        formData = await request.formData();
     // 输出 FormData 内容
     //       for (let [key, value] of formData.entries()) {
     //           console.log(`${key}:`, value);
     //       }
    let fileData;
    // 获取文件
        fileData = formData.get("file");
        if (!fileData) {
            console.log("File not found in formData");
        }
               // 创建新的 FormData 对象并添加文件
        const newFormData = new FormData();
        newFormData.append("media", fileData, fileData.name);

    try {

         // 转发请求
          // 输出 FormData 内容
            for (let [key, value] of newFormDataformData.entries()) {
                console.log(`${key}:`, value);
            }
        const response = await fetch(uploadUrl, {
            method: 'POST',
        //    headers: request.headers,
            body:    newFormData,
        });

        const jsonResponse = await response.json();
        console.log("jsonResponse=",jsonResponse);
        const resurl = jsonResponse.url;
        console.log("resurl=",resurl);
        const data = {
            "url": resurl,
            "code": 200,
            "name": jsonResponse.filekey
        };

        // 返回响应
        return new Response(JSON.stringify(data), {
            status: response.status,
            headers: {
                ...corsHeaders,
                ...response.headers,
            },
        });
    } catch (error) {
        console.log("FileData:", fileData);
      //  console.log("FormData:", Object.fromEntries(formData.entries()));

        return new Response(JSON.stringify({
    status: 500,
    success: false,
    formData: {
        file: fileData ? {
            name: fileData.name,
            size: fileData.size,
            type: fileData.type
        } : null
    },
    fileData: fileData ? fileData.name : null
}), {
    status: 500,
    headers: corsHeaders,
});

    }
}
