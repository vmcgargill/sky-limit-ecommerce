function ConvertImage(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((byte) => binary += String.fromCharCode(byte));
  return window.btoa(binary);
};

export default ConvertImage;