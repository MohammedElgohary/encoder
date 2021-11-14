/* Elements */
const editor = document.querySelector("#textCode"),
  btnSave = document.querySelector("#btnSave"),
  btnCopy = document.querySelector("#btnCopy"),
  btnEncode = document.querySelector("#btnEncode"),
  btnDecode = document.querySelector("#btnDecode"),
  result = document.querySelector("#result"),
  langSelect = document.querySelector("#langSelect");

const secret = 777;

const keys = {
  enter: null,
};

const operations = {
  encode: "ENCODE",
  decode: "DECODE",
};

const langs = {
  en: "en",
  ar: "ar",
  fr: "fr",
};

let langsText = {
  en: {
    header: "Encoder",
    textBoxPlaceHolder: "Enter some text ...",
    btnEncode: "Encode",
    btnDecode: "Decode",
    btnCopy: "Copy",
    btnSave: "Save",
    noResult: "The result will appear here",
    footer: `&copy; <strong>Mohammed Elgohary</strong>
    <span class="orange">${new Date().getFullYear()}</span>`,
    dir: "ltr",
    key: "en",
    name: "English",
  },
  ar: {
    header: "Encoder",
    textBoxPlaceHolder: "اكتب بعض النص ...",
    btnEncode: "تشفير",
    btnDecode: "فك تشفير",
    btnCopy: "نسخ",
    btnSave: "حفظ",
    noResult: "ستظهر النتسجة هنا",
    footer: `&copy; <strong>محمد الجوهري</strong>
    <span class="orange">${new Date().getFullYear()}</span>`,
    dir: "rtl",
    key: "ar",
    name: "العربيه",
  },
};

let DefaultLang = langs.ar;
let currentLang = localStorage.getItem("lang") || langs.ar;

const encodeSum = (num) => num * 79 + secret;

const decodeSum = (num) => (num - secret) / 79;

const makeCode = (str, op) => {
  let res = "";

  for (let index in str) {
    let code =
      op === operations.encode
        ? encodeSum(str.charCodeAt(index))
        : decodeSum(str.charCodeAt(index));

    res += String.fromCharCode(code);
  }

  res = res || langsText[currentLang].noResult;
  result.innerHTML = res;
  localStorage.setItem("text", str);
};

const copyResult = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }

  toast.success("تم نسخ الكود بنجاح");
};

const translate = (lang = DefaultLang) => {
  editor.setAttribute("placeholder", langsText[lang].textBoxPlaceHolder);
  btnEncode.innerText = langsText[lang].btnEncode;
  btnDecode.innerText = langsText[lang].btnDecode;
  btnCopy.innerText = langsText[lang].btnCopy;
  btnSave.innerText = langsText[lang].btnSave;
  result.innerText = langsText[lang].noResult;
  document.querySelector("#footer").innerHTML = langsText[lang].footer;

  localStorage.setItem("lang", lang);
  document.body.dir = langsText[lang].dir;

  currentLang = lang;
  langSelect.value = currentLang;

  document.body.setAttribute("class", lang);
};

editor.addEventListener("keyup", (e) => {
  makeCode(e.target.value, operations.encode);
});

btnDecode.addEventListener("click", () => {
  makeCode(editor.value, operations.decode);
});

btnEncode.addEventListener("click", () => {
  makeCode(editor.value, operations.encode);
});

btnCopy.addEventListener("click", () => {
  copyResult(result.innerText);
});

btnSave.addEventListener("click", () => {
  var blob = new Blob([result.innerText], { type: "text/plain;charset=utf-8" });
  FileSaver.saveAs(blob, `encoder${Math.random()*99999}.txt`);
});

langSelect.addEventListener("change", (e) => {
  translate(e.target.value);
});

window.onload = () => {
  let lang = currentLang;
  translate(lang);

  for (let key in langsText) {
    langSelect.innerHTML += `<option value="${langsText[key].key}">${langsText[key].name}</option>`;
  }
};