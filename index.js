export default class MyFormData {
  // 将随机数传入构造函数
  constructor(stamp) {
    this._boundary_key = stamp; // 随机数，分隔符和结尾分隔符必需。
    this._boundary = "--" + this._boundary_key;
    this._end_boundary = this._boundary + "--";
    this._result = [];
  }
  // 上传普通键值对——字符串、数字
  append(key, value) {
    this._result.push(this._boundary + "\r\n");
    this._result.push(
      'Content-Disposition: form-data; name="' + key + '"' + "\r\n\r\n"
    );
    this._result.push(value);
    this._result.push("\r\n");
  }
  // 上传复杂数据——文件
  appendFile(name, data, ext) {
    let type = "audio/mpeg";
    let filename = "upload." + ext;

    this._result.push(`${this._boundary}\r\n`);
    this._result.push(
      `Content-Disposition: form-data; name="${name}"; filename="${filename}"\r\n`
    ); // 上传文件定义
    this._result.push(`Content-Type: ${type}\r\n`);
    this._result.push("\r\n");
    this._result.push(data);
    this._result.push("\r\n");
  }
  // 获取二进制数据 get
  get arrayBuffer() {
    this._result.push("\r\n" + this._end_boundary); // 结尾分隔符
    let charArr = [];

    // 处理charCode
    for (let i = 0; i < this._result.length; i++) {
      // 取出文本的charCode
      let item = this._result[i];
      if (typeof item === "string") {
        for (let s = 0; s < item.length; s++) {
          charArr.push(item.charCodeAt(s));
        }
      } else if (typeof item === "number") {
        let numstr = item.toString();

        for (let s = 0; s < numstr.length; s++) {
          charArr.push(numstr.charCodeAt(s));
        }
      } else {
        for (let j = 0; j < item.length; j++) {
          charArr.push(item[j]);
        }
      }
    }
    let array = new Uint8Array(charArr);
    return array.buffer;
  }
}
