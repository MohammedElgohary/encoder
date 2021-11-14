/* Elements */
const editor = document.querySelector("#textCode"),
  btnSave = document.querySelector("#btnSave"),
  btnCopy = document.querySelector("#btnCopy"),
  btnEncode = document.querySelector("#btnEncode"),
  btnDecode = document.querySelector("#btnDecode"),
  result = document.querySelector("#result");

const secret = 777;

const keys = {
  enter: null,
};

const operations = {
  encode: "ENCODE",
  decode: "DECODE",
};

const encodeSum = (num) => num * 79 - secret;

const decodeSum = (num) => (num - screen) / 79 ;

const makeCode = (str, op) => {
  let res = "";

  for (let index in str) {
    let code =
      op === operations.encode
        ? encodeSum(str.charCodeAt(index))
        : decodeSum(str.charCodeAt(index));

    res += String.fromCharCode(code);
  }

  res = res || "The result will appear here";
  result.innerHTML = res;
};

editor.addEventListener("keyup", (e) => {
  makeCode(e.target.value, operations.decode);
});
