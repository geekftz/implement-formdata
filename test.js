const stamp = Date.now(); // 生成随机数，这里使用了时间戳
const fd = new MyFormData(stamp);

for (const key in data) {
  if (data.hasOwnProperty(key)) {
    fd.append(key, data[key]);
  }
}

fd.appendFile("file", blob, data.fileExtName); // 添加要上传的文件，这里记得第三个参数要传入文件后缀名。

const config = {
  headers: {
    "Content-Type": `multipart/form-data; boundary=${stamp}`, // 分隔符
  },
};

axios({
  url,
  data: fd.arrayBuffer,
  method: "POST",
  headers,
})
  .then((response) => {
    if (response.status === 200) {
      const { data } = response;
      console.log("fun -> JSON.stringify(data)", JSON.stringify(data));
    }
  })
  .catch((err) => {
    console.log(err);
  });
