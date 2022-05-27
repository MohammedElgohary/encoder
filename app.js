/* Elements */
const editor = document.querySelector("#textCode"),
  secretInput = document.querySelector("#secret"),
  btnSave = document.querySelector("#btnSave"),
  btnCopy = document.querySelector("#btnCopy"),
  btnEncode = document.querySelector("#btnEncode"),
  btnDecode = document.querySelector("#btnDecode"),
  btnOpen = document.querySelector("#btnOpen"),
  MyFile = document.querySelector("#MyFile"),
  result = document.querySelector("#result"),
  langSelect = document.querySelector("#langSelect"),
  styler = document.querySelector("#styler"),
  themes = document.querySelectorAll("#themes .theme");

let secret = localStorage.getItem("secret") || 777;

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
  gr: "gr",
  es: "es",
  ru: "ru",
  hi: "hi",
};

const langsConfig = {
  en: {
    index: 0,
    header: "Encoder",
    textBoxPlaceHolder: "Enter some text ...",
    secretPlaceHolder: "Secret ...",
    btnEncode: "Encode",
    btnDecode: "Decode",
    btnCopy: "Copy",
    btnSave: "Save",
    btnOpen: "Open",
    noResult: "The result will appear here",
    footer: `&copy; <strong>Mohammed Elgohary</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "en",
    name: "English",
  },
  ar: {
    index: 1,
    header: "Encoder",
    textBoxPlaceHolder: "اكتب بعض النص ...",
    secretPlaceHolder: "كلمة السر ...",
    btnEncode: "تشفير",
    btnDecode: "فك تشفير",
    btnCopy: "نسخ",
    btnSave: "حفظ",
    btnOpen: "فتح",
    noResult: "ستظهر النتسجة هنا",
    footer: `&copy; <strong>محمد الجوهري</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "rtl",
    key: "ar",
    name: "العربيه",
  },
  fr: {
    index: 2,
    header: "Encoder",
    textBoxPlaceHolder: "Entrez du texte...",
    secretPlaceHolder: "Secrète...",
    btnEncode: "Encoder",
    btnDecode: "Décoder",
    btnCopy: "Copie",
    btnSave: "sauvegarder",
    btnOpen: "Ouvert",
    noResult: "Le résultat apparaîtra ici",
    footer: `&copy; <strong>Mohammed Elgohary</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "fr",
    name: "français",
  },
  gr: {
    index: 3,
    header: "Encoder",
    textBoxPlaceHolder: "Geben Sie etwas Text ein ...",
    secretPlaceHolder: "Geheimnis ...",
    btnEncode: "Kodieren",
    btnDecode: "Dekodieren",
    btnCopy: "Kopieren",
    btnSave: "Speichern",
    btnOpen: "Offen",
    noResult: "Das Ergebnis erscheint hier",
    footer: `&copy; <strong>Mohammed Elgohary</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "gr",
    name: "Deutsch",
  },
  es: {
    index: 4,
    header: "Encoder",
    textBoxPlaceHolder: "SecrIntroduzca algún texto...",
    secretPlaceHolder: "Secreto ...",
    btnEncode: "Codificar",
    btnDecode: "Descodificar",
    btnCopy: "Dupdo",
    btnSave: "Ahorrar",
    btnOpen: "Abierto",
    noResult: "El resultado aparecerá aquí",
    footer: `&copy; <strong>Mohammed Elgohary</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "es",
    name: "Español",
  },
  ru: {
    index: 5,
    header: "Encoder",
    textBoxPlaceHolder: "какой-нибудь текст ...",
    secretPlaceHolder: "Секрет ...",
    btnEncode: "Кодировать",
    btnDecode: "Декодировать",
    btnCopy: "Копировать",
    btnSave: "Сохранить",
    btnOpen: "Открытым",
    noResult: "Результат появится здесь",
    footer: `&copy; <strong>Мохаммед Эльгохари</strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "ru",
    name: "русский",
  },
  hi: {
    index: 6,
    header: "Encoder",
    textBoxPlaceHolder: "यहां कुछ टेक्स्ट दर्ज करें ...",
    secretPlaceHolder: "गुप्त  ...",
    btnEncode: "एन्कोड",
    btnDecode: "व्याख्या करना",
    btnCopy: "प्रतिलिपि",
    btnSave: "सहेजें",
    btnOpen: "खोलना",
    noResult: "परिणाम यहां दिखाई देगा",
    footer: `&copy; <strong>मोहम्मद एल्गोहरी </strong>
    <span class="orange"> ${new Date().getFullYear()} </span>`,
    dir: "ltr",
    key: "hi",
    name: "हिंदी",
  },
};

const MyThemes = {
  blue: ":root {--mainColor: #fff;--mainBackground: #2c3e50;--BackgroundLight: #eee;--BackgroundFooter: #37516b;}",
  purple:
    ":root {--mainColor: #fff;--mainBackground: #8e44ad;--BackgroundLight: #efcefd;--BackgroundFooter: #996aad;}",
  orange:
    ":root {--mainColor: #fff;--mainBackground: #e67e22;--BackgroundLight: #fdecde;--BackgroundFooter: #eba161;}",
  black:
    ":root {--mainColor: #fff;--mainBackground: #000;--BackgroundLight: #eee;--BackgroundFooter: #222;}",
};

let DefaultLang = langs.en;
let currentLang = localStorage.getItem("lang") || DefaultLang;

let DefaultTheme = "blue";
let currentTheme = localStorage.getItem("theme") || DefaultTheme;

const encodeSum = (num) => +num * 12 + secret;

const decodeSum = (num) => (+num - +secret) / 12;

const makeCode = (str, op) => {
  let res = "";

  for (let index in str) {
    let code =
      op === operations.encode
        ? encodeSum(str.charCodeAt(index))
        : decodeSum(str.charCodeAt(index));

    res += String.fromCharCode(code);
  }

  res = res || langsConfig[currentLang].noResult;
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
};

const changeTheme = (theme) => {
  styler.innerHTML = `<style>${MyThemes[theme]}</style>`;
};

const translate = (lang = DefaultLang) => {
  editor.setAttribute("placeholder", langsConfig[lang].textBoxPlaceHolder);
  secretInput.setAttribute("placeholder", langsConfig[lang].secretPlaceHolder);
  btnEncode.innerText = langsConfig[lang].btnEncode;
  btnDecode.innerText = langsConfig[lang].btnDecode;
  btnCopy.innerText = langsConfig[lang].btnCopy;
  btnSave.innerText = langsConfig[lang].btnSave;
  btnOpen.innerText = langsConfig[lang].btnOpen;
  result.innerText = langsConfig[lang].noResult;
  document.querySelector("#footer").innerHTML = langsConfig[lang].footer;

  localStorage.setItem("lang", lang);
  currentLang = lang;

  document.body.dir = langsConfig[lang].dir;

  langSelect.setAttribute("value", lang);
  langSelect.selectedIndex = langsConfig[lang].index;

  document.body.setAttribute("class", lang);
};

editor.addEventListener("keyup", (e) => {
  makeCode(e.target.value, operations.encode);
});

secretInput.addEventListener("keyup", (e) => {
  let str = e.target.value;
  let secretVal = 0;

  for (let index in str) {
    secretVal += str.charCodeAt(index);
  }

  secret = secretVal;

  localStorage.setItem("secret", secretVal);
  localStorage.setItem("secretString", str);

  makeCode(editor.value, operations.encode);
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
  if (result.innerText !== langsConfig[currentLang].noResult) {
    var blob = new Blob([result.innerText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, `Encoder${Math.random() * 99999}.txt`);
  }
});

btnOpen.addEventListener("click", () => {
  MyFile.click();
});

MyFile.addEventListener("change", (e) => {
  var fr = new FileReader();
  fr.onload = function () {
    editor.value = fr.result;
    makeCode(fr.result, operations.decode);
  };

  fr.readAsText(e.target.files[0]);
});

langSelect.addEventListener("change", (e) => {
  translate(e.target.value);
});

themes.forEach((theme) => {
  theme.addEventListener("click", (e) => {

    let themeName = e.target.getAttribute("name");
    changeTheme(themeName);

    localStorage.setItem("theme", themeName);

    themes.forEach((t) => t.classList.remove("active"));
    theme.classList.add("active");
    
    currentTheme = themeName;
  });
  
  theme.classList.remove("active");
  if (theme.getAttribute("name") === currentTheme ) {
    theme.classList.add("active");
  }
});

window.onload = () => {
  changeTheme(currentTheme);
  translate(currentLang);
  
  editor.value = localStorage.getItem("text") || "";
  secretInput.value = localStorage.getItem("secretString") || "";

  makeCode(editor.value, operations.encode);

  for (let key in langsConfig) {
    langSelect.innerHTML += `<option value="${langsConfig[key].key}" ${
      currentLang === key ? "selected" : ""
    }>${langsConfig[key].name}</option>`;
  }
};
