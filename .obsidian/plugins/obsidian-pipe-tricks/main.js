var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => PipeTricksPlugin
});
var import_obsidian = __toModule(require("obsidian"));
var FINAL_PAREN = /\s\(.*\)$/;
var FINAL_COMMA = /,.*$/;
var PipeTricksPlugin = class extends import_obsidian.Plugin {
  onload() {
    return __async(this, null, function* () {
      this.registerMarkdownPostProcessor((element) => {
        element.querySelectorAll("a.internal-link").forEach(updateLinkText);
      });
    });
  }
};
function updateLinkText(link) {
  const text = link.innerText;
  const href = link.getAttr("href");
  if (!text) {
    const hasFinalParenthesis = FINAL_PAREN.test(href);
    link.innerText = hasFinalParenthesis ? href.replace(FINAL_PAREN, "") : href.replace(FINAL_COMMA, "");
    blendSuffix(link);
  }
}
function blendSuffix(link) {
  const sibling = link.nextSibling;
  if (sibling.nodeType !== Node.TEXT_NODE) {
    return;
  }
  const siblingText = sibling.nodeValue;
  const idx = siblingText.indexOf(" ");
  const suffix = idx > 0 ? siblingText.slice(0, idx) : "";
  if (suffix.length > 0 && !punctuation.contains(suffix[0])) {
    link.innerText += suffix;
    sibling.nodeValue = siblingText.slice(suffix.length);
  }
}
var punctuation = [
  ".",
  "?",
  "!",
  ",",
  ";",
  ":",
  "-",
  "\u2013",
  "\u2014",
  "[",
  "]",
  "(",
  ")",
  "{",
  "}",
  "'",
  '"',
  "\u2026"
];
